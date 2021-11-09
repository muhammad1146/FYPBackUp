const Joi = require('joi');
const {Questions,QuestionImage,QuestionTags,QuestionReacts,QuestionTagBox,
    Answers,QuestionComments,QuestionReport,AnswerImages,AnswerReacts,AnswerReports} = require('../models/questions'); 
exports.getQuestions = async (req,res) => {

    try { 
        const questions = await Questions.findAll({include:[Farmers,QuestionReacts]});
        return res.json(questions);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.getQuestion = async (req,res) => {
    const id = req.params.qid;
    try { 
        const question = await Questions.findOne({where:{id},include:[Farmers,QuestionReacts]});
        return res.json(questions);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.addQuestion = async (req,res) =>{
    const schema = Joi.obect( {
        body: Joi.string().required(),
        farmerId:Joi.string().required(),
        farmingType: Joi.string().required(),
        img: Joi.array().required(),
        tags: Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const  {body,farmerId,farmingType} = req.body;
    const {img} = req.body;
    const {tags} = req.body;
    try {
        const question = await Questions.create({body,farmerId,farmingType});
        const questionImages = [], questionTags = [];
        for (let j = 0; j<img.length; j++){
            const obj = {
                image:img[j],
                questionId: question.id
            }
            questionImages.push(obj);

        }
        
        for (let j = 0; j<tags.length; j++){
            const obj = {
                tagId:tags[j],
                questionId: question.id
            }
            questionTags.push(obj);

        }
        
        const images = await QuestionImage.bulkCreate(questionImages,{returning:true});
        const qTags = await QuestionTags.bulkCreate(questionTags,{returning:true});
        return res.json(question,images,qTags);
    } catch (error) {
        return res.status(500).json(error);
    }

}

exports.editQuestion =async (req,res) =>{
    const schema = Joi.obect( {
        body: Joi.string().required(),
        farmingType: Joi.string().required(),
        questionTags: Joi.array().required(),
        questionImages:Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const questionId = req.params.qid;
    const {body,farmingType} = req.body;
    const {questionTags} = req.body;
    const {questionImages} = req.body;
    try { 
        const updatedQuestion = await Questions.update({body,farmingType},{where:{id:questionId}});
        const updatedquestionTags = await QuestionTags.bulkCreate({questionTags},
            {updateOnDuplicate:["tagId"]},{where:{questionId}});
        const updatequestionImages = QuestionImage.bulkCreate({questionImages},
            {updateOnDuplicate:["image"]},{where:{questionId}});
            return res.json(updatedQuestion,updatedquestionTags,updatequestionImages);
        
    } catch (error) {
        return res.status(500).json(error);
    }

}
exports.deleteQuestion = async (req,res) =>{
    const questionId = req.params.qid;
    try {
        const answers = await Answers.destroy({where:{questionId}});
        const reacts = await QuestionReacts.destroy({where:{questionId}});
        const comment = await QuestionComments.destroy({where:{questionId}});
        const report = await QuestionReport.destroy({where:{questionId}});
        const question = await Questions.destroy({where:{id:questionId}});
        return res.json({question,answers,reacts,comment,report}); 
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.addQuestionReact = async (req,res) => {
    const schema = Joi.obect( {
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
//QuestionReport
exports.reportQuestion = async (req,res) => {
    const schema = Joi.obect( {
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
    const schema = Joi.obect( {
        questionId: Joi.string().required(),
        body: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const expertId = req.params.eid;
    const questionId = req.params.qid;
    const {body} = req.body;
    try {
        const answer = await Answers.create({body,questionId,expertId});
        return res.json(answer);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.editAnswer = async (req,res) =>
{ //For Expert Entity
    const schema = Joi.obect( {
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
    try 
    {
        const reports = await AnswerReports.destroy({where:{answerId:id}});
        const reacts = await AnswerReacts.destroy({where:{answerId:id}});
        const images = await AnswerImages.destroy({where:{answerId:id}});
        const answer = await Answers.destroy({where:{id}});
        return res.json({answer,reports,reacts,images}); 
    } catch (error) 
    {
        return res.status(500).json(error);
    }
};

exports.addAnswerReact = async (req,res) =>{ // For Expert Entity
    const answerId = req.params.aid;
    const questionId = req.params.qid;
    const schema = Joi.obect( {
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
    const schema = Joi.obect( {
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
exports.getQuestionTags = (req,res) =>
{ //get All Tags from QuestionTagBox
    
    try 
    {
        const tags = QuestionTagBox.findAll();
        return res.json(tags);
    } catch (error) 
    {
        return res.status(500).json(error);
    } 
};

exports.addTagToQuestionTagBox = async (req,res) =>{ //Add new Tag to QuestionTagBox
    const schema = Joi.obect( {
        tag: Joi.string().required(),
        description: Joi.string().required(),
        
    });
    try {
        const {error} = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }

    const {tag,description} = req.body;
    try {
        const newTag = await QuestionTagBox.create({tag,description});
        return res.json(newTag);
    } catch (error) {
        return res.status(500).json(error);
    }
};



 