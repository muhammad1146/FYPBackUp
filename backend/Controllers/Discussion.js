const e = require('express');
const Joi = require('joi');
const { Op } = require('sequelize');

const {Questions,QuestionImage,QuestionTags,QuestionReacts,QuestionTagBox,
    Answers,QuestionComments,QuestionReport,AnswerImages,AnswerReacts,AnswerReport,Experts,Farmers,FarmersRank} = require('../models'); 
exports.getQuestions = async (req,res) => {
    console.log('inside getQuestions');
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let tag = req.query.tag;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
   
    try { 
      
        
        const questions = await Questions.findAndCountAll({include:[{model:Farmers,attributes:["userName","uuid","profileImage"],include:[FarmersRank]},{model:QuestionReacts,attributes:["commitType", "commiterId"]},{model:QuestionTags,include:[QuestionTagBox]},{model:QuestionReacts,include:[{model:Farmers,attributes:['uuid']}]}],limit:size,offset:size*page});
        return res.json({
        content:questions.rows,
        totalPages:Math.ceil(questions.count/Number.parseInt(size))
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


exports.searchQuestions = async (req,res) => {
    console.log('inside searchQuestions');
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let search = req.query.search;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
   
    try { 
        const questions = await Questions.findAndCountAll({where:{
            [Op.or]:[
                {title: {[Op.iLike]: '%' + search + '%'}},
                {body: {[Op.iLike]: '%' + search + '%'}}
            ]

        },include:[{model:Farmers,attributes:["userName","uuid","profileImage"],include:[FarmersRank]},{model:QuestionReacts,attributes:["commitType", "commiterId"]},{model:QuestionTags,include:[QuestionTagBox]},{model:QuestionReacts,include:[{model:Farmers,attributes:['uuid']}]}],limit:size,offset:size*page});
        return res.json({
        content:questions.rows,
        totalPages:Math.ceil(questions.count/Number.parseInt(size))
        });
        console.log(questions);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getMyQuestions = async (req,res) => {
    console.log('reached getMyQuestions:');
    const search = req.query.search;
    try { 
        const farmer = await Farmers.findOne({attributes:['id'], where:{uuid:req.user.uuid}});
        if(farmer){
            let questions;
            console.log(search);
            if(search !== null){
                console.log('in if portion')
                questions = await Questions.findAll({where:{farmerId:farmer.id,
                [Op.or]:[
                    {title: {[Op.iLike] : '%' + search + '%'}}
                ]
                },include:[{model:Farmers,attributes:["userName","uuid","profileImage"],include:[FarmersRank]},{model:QuestionReacts,attributes:["commitType", "commiterId"]},{model:QuestionTags,include:[QuestionTagBox]},{model:QuestionReacts,include:[{model:Farmers,attributes:['uuid']}]}]});
            }else{
                console.log('in else portion')
                questions = await Questions.findAll({where:{farmerId:farmer.id
                },include:[{model:Farmers,attributes:["userName","uuid","profileImage"],include:[FarmersRank]},{model:QuestionReacts,attributes:["commitType", "commiterId"]},{model:QuestionTags,include:[QuestionTagBox]},{model:QuestionReacts,include:[{model:Farmers,attributes:['uuid']}]}]});

            }
            return res.json(questions);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getTagQuestions = async (req,res) => {
    console.log('reached getTagQuestions');
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
   let tag = req.params.id;
   console.log('get tag id', tag);

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
    try { 
            const questions = await QuestionTags.findAndCountAll({where:{tagId:tag},include:[{model:Questions,include:[{model:QuestionReacts,include:[{model:Farmers,attributes:['uuid']}]},{model:QuestionTags,include:[QuestionTagBox]},{model:Farmers,attributes:["userName","uuid","profileImage"],include:[FarmersRank]}]}],limit:size,offset:size*page});
                return res.json({content:questions.rows,totalPages:Math.ceil(questions.count/Number.parseInt(size))});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getQuestion = async (req,res) => {
    const uuid = req.params.qid;
    try { 
        console.log("reached question route!");
        const questions = await Questions.findOne({where:{uuid},include:[Farmers,{model:QuestionReacts,include:[Farmers]},{model:QuestionTags,include:[QuestionTagBox]}]});
        return res.json(questions);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
exports.addQuestion = async (req,res) =>{
    console.log(req.body.title);
    const schema = Joi.object( {
        title:Joi.string().required(),
        body: Joi.string().required(),
        images: Joi.array(),
        tags: Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return; 
    }
    let uuid = req.user.uuid;
    const  {title,body,images,tags} = req.body;
    console.log(tags);
    let farmerId;
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        if(farmer.id) farmerId=farmer.id 
        else return res.status(401).send("invalid request");
        const question = await Questions.create({title,body,farmerId});
        let questionImages = [], questionTags = [];
        questionImages = images?.map((img)=>{
            return {image:img,questionId:question.id}

        })
        questionTags = tags.map((tag)=>{
            return {tagId:tag,questionId:question.id}

        })
        let qimages;
        if(images){
             qimages = await QuestionImage.bulkCreate(questionImages,{returning:true});
        };
        const qTags = await QuestionTags.bulkCreate(questionTags,{returning:true});
        return res.json(question,qimages,qTags);
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
    if(req.user.type==='F') 
    {
        console.log('passed first check!');
        try {
            const question = await Questions.findOne({attributes:["id","farmerId"], where:{uuid:questionuuid}});
            const farmer = await Farmers.findOne({where:{uuid}});
            if(question){
                questionFarmerId = question.farmerId;
                questionId = question.id;
            }else {
                return res.status(400).send("Question Not Found!!");
            }
            if(farmer){
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
    else if(req.user.type==='A'){
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
    const uuid = req.params.qid; 
    const schema = Joi.object( {
        commitType:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    let questionId,commiterType = req.user.type,commiterId; 
    const {commitType} = req.body;
    try {
        let question = await Questions.findOne({attributes:['id'],where:{uuid}});
        if(question.id) questionId =question.id; 
       //fetch the commiter now
        let result,deletedCommiter;
        if(commiterType==='F'){
            result = await Farmers.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
            if(result.id) commiterId=result.id;
            deletedCommiter = await QuestionReacts.destroy({where:{commiterId,questionId}});
        }else{
            result = await Experts.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
            if(result.id) commiterId= result.id;
            deletedCommiter = await QuestionReacts.destroy({where:{commiterId,questionId}});
        }
        
        const qReact = await QuestionReacts.create({questionId,commitType,commiterType,commiterId});
        return res.json(qReact);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }

};

exports.getQuestionReacts = async (req,res) => {
    const uuid = req.params.qid;
    try {

        const reacts = QuestionReacts
    } catch (error) {
        
    }
}

exports.deleteQuestionReacts = async (req,res) => {
    const qid = req.params.qid,uuid= req.user.uuid;
    try {
        const question = await Questions.findOne({attributes:['id'],where:{uuid:qid}});
        const farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        let reacts;
        if(farmer && question){
            reacts = QuestionReacts.destroy({where:{commiterId:farmer.id,questionId:question.id}});
        }
        return res.status(200).json(reacts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

exports.addQuestionComment = async (req,res) => {
    const schema = Joi.object( {
        body:Joi.string().required(),
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const questionUUID = req.params.qid,uuid= req.user.uuid;
    let questionId,commenterId,commenterType = req.user.type; 
    const {body} = req.body;
    try {
        const question = await Questions.findOne({attributes:['id'],where:{uuid:questionUUID}});
        if(question){
            questionId = question.id;
        }else{
            return res.status(401).json({error:'Invalid Request'});
        }
        let commenter;
        if(commenterType==='E'){
            commenter = await Experts.findOne({attributes:['id'],where:{uuid}});
            if(commenter){
                commenterId = commenter.id;
            }
        }else{
            commenter = await Farmers.findOne({attributes:['id'],where:{uuid}});
            if(commenter){
                commenterId = commenter.id;
            }
        }
        const qComment = await QuestionComments.create({body,questionId,commenterId,commenterType});
        return res.json(qComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

};

exports.getQuestionComments = async (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    console.log('inside getQuestionComments');
    const id = req.params.qid;
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    } 
    let size = 5;
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    } 
    try {
        const question = await Questions.findOne({attributes:['id'],where:{uuid:id}})
        if(question.id){
            const comments = await QuestionComments.findAndCountAll({where:{questionId:question.id},include:[Experts,Farmers],limit:size,offset:size*page});
        return res.json({content:comments.rows,
            totalPages:Math.ceil(comments.count / Number.parseInt(size))});
        }else{
            return res.status(500).json({error:'The Question not found!'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.deleteQuestionComment = async (req,res) => {
    const id = req.params.commentid;
    const uuid = req.user.uuid;
    const userType = req.user.type
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
        const questionComment = QuestionComments.findOne({where:{uuid:id}});
        commentorType = questionComment.commenterType;
        commentorId = questionComment.commenterId;
    } catch (error) {
        return res.status(401).send('Invalid Request');
    }
try {
        if(commentorId===requesterId){
            const qComment = await QuestionComments.destroy({where:{uuid:id}});
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


exports.getAnswers = async (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    const id = req.params.qid;
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    } 
    let size = 8;
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    } 
    try {
        const question = await Questions.findOne({attributes:['id'],where:{uuid:id}});
        if(question.id){
            const answers = await Answers.findAndCountAll({where:{questionId:question.id},include:[Experts],limit:size,offset:size*page});
            console.log(answers);
            return res.json({content:answers.rows,
                totalPages:Math.ceil(answers.count / Number.parseInt(size))});
        }else{
            return res.status(500).json({error:"Question not found!"})
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAnswer = async (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    const id = req.params.aid;
    try {
        const answers = await Answers.findOne({where:{id},include:[Experts]});
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
    try 
    {
        if(expertId===answerExpertId || req.user.type==='A'){
            const answerData = await Answers.findOne({attributes:['id'], where:{uuid:id}});
            const reports = await AnswerReport.destroy({where:{answerId:answerData.id}});
            const reacts = await AnswerReacts.destroy({where:{answerId:answerData.id}});
            const images = await AnswerImages.destroy({where:{answerId:answerData.id}});
            const answer = await Answers.destroy({where:{uuid:id}});
            return res.json({answer,reports,reacts,images}); 
        }
        else{
            return res.status(401).send('Forbidden Access!');
        }
    } catch (error) 
    {   console.log(error)
        return res.status(500).json({error});
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
{ //get Tag from QuestionTagBox
    let tagId = req.params.tid;
    try 
    {
        const tags = QuestionTags.findOne({where:{tagId}});
        return res.json({tags});
    } catch (error) 
    {
        return res.status(500).json(error);
    } 
};

exports.deleteQuestionTag = (req,res) =>
{ 
    let tagId = req.params.tid;
    try 
    {
        const qtags = QuestionTags.destroy({where:{tagId}});
        const tag = QuestionTagBox.destroy({where:{tagId}});
        return res.json({qtags,tag});
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


exports.searchTags = async (req,res) =>{ //search all Question Tags
   
    let query = req.query.query;
    try {
        let tags = await QuestionTagBox.findAll
        (
            {
                where:
                {
                    [Op.or]:[
                        {tag: {[Op.iLike] : '%' + query + '%'} },
                        {description: {[Op.iLike]: '%' + query + '%'}}
                    ]
                }
            }        
        );
        return res.json(tags);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


 