const Joi = require('joi');
const fetch = require("node-fetch");
const {Questions,QuestionImage,QuestionTags,QuestionReacts,QuestionTagBox,
    Answers,QuestionComments,QuestionReport,AnswerImages,AnswerReacts,AnswerReports,Experts,Farmers} = require('../models'); 
exports.getQuestions = async (req,res) => {
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
    // let category = req.query.cat;
// if(category){

//     }
    try { 
        
        const questions = await Questions.findAndCountAll({include:[{model:Farmers,attributes:["userName","profileImage","rankId"]},{model:QuestionReacts,attributes:["commitType","commiterId"]}],limit:size,offset:size*page});
        return res.json({
        content:questions.rows,
        totalPages:Math.ceil(questions.count/Number.parseInt(size))
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
exports.getQuestion = async (req,res) => {
    const uuid = req.params.qid;
    try { 
        console.log("reached question route!");
        const questions = await Questions.findOne({where:{uuid},include:[Farmers,QuestionReacts,QuestionComments,QuestionImage,QuestionTags]});
        return res.json(questions);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
exports.addQuestion = async (req,res) =>{
    const schema = Joi.object( {
        body: Joi.string().required(),
        farmingType: Joi.string().required(),
        img: Joi.array(),
        tags: Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return; 
    }
    let uuid = req.user.uuid;
    const  {body,farmingType} = req.body;
    const {img} = req.body;
    const {tags} = req.body;
    let farmerId;
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        if(farmer.id) farmerId=farmer.id 
        else return res.status(401).send("invalid request");
        const question = await Questions.create({body,farmerId,farmingType});
        let questionImages = [], questionTags = [];
        questionImages = questionImages.map((img)=>{
                    let obj ={};
                    obj.image = img;
                    obj.questionId = question.id;
                    return obj
        })
        questionTags = questionTags.map((tag)=>{
            let obj = {}
            obj.tagId=tags,
            obj.questionId= question.id
            return obj
        })
        const images = await QuestionImage.bulkCreate(questionImages,{returning:true});
        const qTags = await QuestionTags.bulkCreate(questionTags,{returning:true});
        return res.json(question,images,qTags);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }

}

exports.editQuestion =async (req,res) =>{
    const schema = Joi.object( {
        body: Joi.string().required(),
        farmingType: Joi.string().required(),
        questionTags: Joi.array().required(),
        questionImages:Joi.array()
    });
    try {
        const value = await schema.validateAsync(req.body);    
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return; 
    }
    const uuid = req.params.qid;
    const {body,farmingType} = req.body;
    let {questionTags,questionImages} = req.body;
    let tags,images;
    let questionId;
    try { 
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
        let question = await Questions.findOne({attributes:["farmerId","id"],where:{uuid}});
        tags = questionTags.map((tag)=>{
            let obj = {}
            obj.tagId=parseInt(tag),
            obj.questionId= question.id
            return obj
        });
        images = questionImages.map((img)=>{
            let obj = {}
            obj.image = img;
            obj.questionId= question.id
            return obj
        });
        console.log(tags);
        if(question.id) questionId=question.id;
        else return res.status(500).send("Question Not Found!!");
        if(farmer.id === question.farmerId){
            let updatedQuestion = await Questions.update({body,farmingType},{where:{uuid}});
            let deletedQuestionTags = await QuestionTags.destroy({where:{questionId}});
            let deletedQuestionImages = await QuestionImage.destroy({where:{questionId}});
            let newImages = await QuestionImage.bulkCreate(images,{returning:true});
            let newTags = await QuestionTags.bulkCreate(tags,{returning:true});      
            let newQuestion = await Questions.findOne({where:{uuid},include:[Farmers,QuestionReacts,QuestionComments,QuestionImage,QuestionTags]})
                    return res.json(newQuestion);
                }
                else {
                    return res.status(401).send("User has no priveleges for this action...")
                }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}
exports.deleteQuestion = async (req,res) =>{
    const questionuuid = req.params.qid;
    let questionId;
    let questionFarmerId, uuid=req.user.uuid, farmerId;
    if(req.user.userType==='F') 
    {
        try {
            const question = await Questions.findOne({attributes:["id","farmerId"], where:{uuid:questionuuid}});
            const farmer = await Farmers.findOne({where:{uuid}});
            if(question.id){
                questionFarmerId = question.farmerId;
                questionId = question.id;
            }else {
                return res.status(400).send("Question Not Found!!");
            }
            if(farmer.id){
                farmerId = farmer.id;

            }
            else {
                return res.status(400).send("Farmer Not Found!!");
            }
        } catch (error) {
            console.log(error);
            return res.status(501).send("Internal Server Error!");
        }
        if(farmerId===questionFarmerId)
        {
            try {
                const answers = await Answers.destroy({where:{questionId}});
                const reacts = await QuestionReacts.destroy({where:{questionId}});
                const comment = await QuestionComments.destroy({where:{questionId}});
                const report = await QuestionReport.destroy({where:{questionId}});
                const images = await QuestionImage.destroy({where:{questionId}});
                const tags = await QuestionTags.destroy({where:{questionId}});
                const question = await Questions.destroy({where:{id:questionId}});
                return res.json({question,answers,reacts,comment,report,images,tags}); 
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        }
        else{
            return res.status(401).send("Forbidden access!");
        }
    }
    else if(req.user.userType==='A'){
        try {
            const answers = await Answers.destroy({where:{questionId}});
            const reacts = await QuestionReacts.destroy({where:{questionId}});
            const comment = await QuestionComments.destroy({where:{questionId}});
            const report = await QuestionReport.destroy({where:{questionId}});
            const question = await Questions.destroy({where:{id:questionId}});
            return res.json({question,answers,reacts,comment,report}); }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
}
}

exports.addQuestionReact = async (req,res) => {
    const schema = Joi.object( {
        questionId:Joi.string().required(),
        commitType:Joi.string().required(),
        commiterType :Joi.string().required(),
        commiterId :Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const {questionId,commitType,commiterType,commiterId} = req.body;
    try {
        const qReact = await QuestionReacts.create({questionId,commitType,commiterType,commiterId});
        return res.json(qReact);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.addQuestionComment = async (req,res) => {
    const schema = Joi.object( {
        body:Joi.string().required(),
        questionId:Joi.string().required(),
        commenterType :Joi.string().required(),
        commenterId :Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const {body,questionId,commenterType,commenterId} = req.body;
    try {
        const qComment = await QuestionComments.create({body,questionId,commenterId,commenterType});
        return res.json(qComment);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.deleteQuestionComment = async (req,res) => {
    const id = req.params.commentid;
    const uuid = req.user.uuid;
    const userType = res.user.type
    let requesterId;
    let commentorType,commentorId;
        if(userType==='F') {
            const farmer = Farmers.findOne({where:{uuid}});
            requesterId = farmer.id;
        }
        else {
            const expert = Experts.findOne({where:{uuid}});
            requesterId = expert.id;
        }
    try {
        const questionComment = QuestionComments.findOne({where:{id}});
        commentorType = questionComment.commenterType;
        commentorId = questionComment.commenterId;
    } catch (error) {
        return res.status(401).send('Invalid Request');
    }
try {
        if(commentorId===requesterId){
            const qComment = await QuestionComments.destroy({where:{id}});
            return res.json(qComment);
        }else {
            return res.status(401).send("Forbidden Access!");}
    }         
        catch (error) {
            return res.status(500).json(error);
        }
};

//QuestionReport
exports.reportQuestion = async (req,res) => {
    const schema = Joi.object( {
        reporterId:Joi.string().required(),
        reportDescription: Joi.string().required()
    });
    try {
        const {error} = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const questionId = req.params.qid;
    const {reporterId,reportDescription} = req.body;
    try {
        const qReport = await QuestionReport.create({questionId,reporterId,reportDescription});
        return res.json(qReport);
    } catch (error) {
        return res.status(500).json(error);
    }

};

// export.removeQuestionReact = async (req,res) => {
//     const {questionId,commiterId} = req.body;
//     try {
//         const qReact = await QuestionReacts.destroy({where:{questionId,commiterId}});
//         return res.json(qReact);
//     } catch (error) {
//         return res.status(500).json(error);
//     }

// };
// Answers


exports.getAnswers = async (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    const id = req.params.qid;
    try {
        const answers = await Answers.findAll({where:{questionId:id}},{include:[Experts]});
        return res.json(answers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAnswer = async (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    const id = req.params.aid;
    try {
        const answers = await Answers.findOne({where:{id}},{include:[Experts]});
        return res.json(answers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.addAnswer = async (req,res) =>{ // For Expert Entity
    const schema = Joi.object( {
        body: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }

    const uuid = req.user.uuid;
    const questionuuid = req.params.qid;
    let questionId;
    let expertId;
    const {body} = req.body;
    try {
        if(!(req.user.type==='F'))
        {
            let question = await Questions.findOne({attributes:["id"],where:{uuid:questionuuid}})
            if(question.id) questionId= question.id;
            else return res.status(401).send("Question Not Found!");
            let expert = await Experts.findOne({attributes:["id"],where:{uuid}})
            if(expert.id) expertId= expert.id;
            else return res.status(401).send("Not Allowed for this action!");
            const answer = await Answers.create({body,questionId,expertId});
            return res.json(answer);
        }else {
            return res.status(401).send("Farmers are not allowed to answer!");
        }
        } catch (error) {
            console.log(error);
        return res.status(500).json(error);
    }
};

exports.editAnswer = async (req,res) =>
{ //For Expert Entity
    const schema = Joi.object( {
        body: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const {body} = req.body;
    const id= req.params.aid;
    try 
    {
        const updatedAnswer = await Answers.update({body},{where:{id}});
        return res.json(updatedAnswer);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};

exports.deleteAnswer = async (req,res) =>
{
    const id = req.params.aid;
    const uuid = req.user.uuid;
    let answerExpertId;
    let expertId;

    if(req.user.type !== 'A') {

        try {
            const expert = Experts.findOne({where:{uuid}});
            const answer = Answers.findOne({where:{id}});
            expertId = expert.id;
            answerExpertId = answer.expertId;
        } catch (error) {
            return res.status(500).send('Internal Server Error!');
        }
    }
    try 
    {
        if(expertId===answerExpertId || req.user.type==='A'){
            const reports = await AnswerReports.destroy({where:{answerId:id}});
            const reacts = await AnswerReacts.destroy({where:{answerId:id}});
            const images = await AnswerImages.destroy({where:{answerId:id}});
            const answer = await Answers.destroy({where:{id}});
            return res.json({answer,reports,reacts,images}); 
        }
        else{
            return res.status(401).send('Forbidden Access!');
        }
    } catch (error) 
    {
        return res.status(500).json(error);
    }
};

exports.addAnswerReact = async (req,res) =>{ // For Expert Entity
    const answerId = req.params.aid;
    const questionId = req.params.qid;
    const schema = Joi.object( {
        commitType: Joi.string().required(),
        commiterType: Joi.string().required(),
        commiterId:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const {commitType,commiterType,commiterId} = req.body;
    try {
        const answerReact = await AnswerReacts.create({answerId,questionId,commitType,commiterId,commiterType});
        return res.json(answerReact);
    } catch (error) {
        return res.status(500).json(error);
    }
};
// Answer Report
exports.addAnswerReport = async (req,res) =>{ //Add new Tag to QuestionTagBox
    const answerId = req.params.aid;
    const date = new Date();
    const schema = Joi.object( {
        reporterId: Joi.string().required(),
        reporterType: Joi.string().required(),
        reportDescription:Joi.string().required(),
        reportStatus: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }

    const {reporterId,reporterType,reportDescription,reportStatus} = req.body;
    try {
        const report = await AnswerReport.create({answerId,reportDescription,reporterId,reporterType,reportStatus,date});
        return res.json(report);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Question Tags
exports.getDiscussionTags = async (req,res) =>
{ //get All Tags from QuestionTagBox
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
    try 
    {
        const tags = await QuestionTagBox.findAndCountAll({limit:size,offset:page*size});
  
        return res.json({content:tags.rows,
            totalPages:Math.ceil(tags.count / Number.parseInt(size))
        });
    } catch (error) 
    {   
        return res.status(500).json(error);
    } 
};

exports.getQuestionTag = (req,res) =>
{ //get All Tags from QuestionTagBox
    let tagId = req.params.tid;
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
    try 
    {
        const tags = QuestionTags.findOne({where:{tagId},include:[{model:Questions,limit:15,offset:15*page}]});
        return res.json({content:tags.rows,
            totalPages:Number.ceil(AllPosts.count / Number.parseInt(size))
        });
    } catch (error) 
    {
        return res.status(500).json(error);
    } 
};

exports.addTagToQuestionTagBox = async (req,res) =>{ //Add new Tag to QuestionTagBox
    const schema = Joi.object({
        tag: Joi.string().required(),
        description: Joi.string().required(),
        
    });
    try {
        const {error} = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    if(req.user.userType==='F'){
        return res.status(401).send("illegal function!!");
    }
    let uuid = req.user.uuid;
    let expertId ;
    const {tag,description} = req.body;
    try {
        let expert = await Experts.findOne({attributes:["id"],where:{uuid}});
        if(expert.id) expertId=expert.id
        else return res.status(401).send("illegal action!!");
        const newTag = await QuestionTagBox.create({tag,description,expertId});
        return res.json(newTag);
    } catch (error) {
        return res.status(500).json(error);
    }
};



 