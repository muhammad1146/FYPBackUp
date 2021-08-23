const {Questions,QuestionImage,QuestionTags,QuestionReacts} = require('../models/questions'); 
exports.getQuestions = (req,res,next) => {

    try {
        const questions = Questions.findAll({include:[Farmers,Answers,QuestionReacts,QuestionComments]});
        return res.json(questions);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.addQuestion = (req,res,next) =>{
    const  {body,farmerId,farmingType} = req.body;
    const {questionImages} = req.body;
    const {questionTags} = req.body;
    try {
        const question = Questions.create({body,farmerId,farmingType});
        const images =  QuestionImage.bulkCreate(questionImages,{returning:true});
        const tags = QuestionTags.bulkCreate(questionTags,{returning:true});
        return res.json(question,images,tags);
    } catch (error) {
        return res.status(500).json(error);
    }

}

exports.editQuestion = (req,res,next) =>{
    const id = req.params.qid;
    const {body,farmingType} = req.body;
    const {questionTags} = req.body;
    const {questionImages} = req.body;
    try {
        const updatedQuestion = Questions.update({body,farmingType},{where:{id}});
        const updatedquestionTags = QuestionTags.bulkCreate({questionTags},
            {updateOnDuplicate:["questionId"]},{where:{questionId:id}});
        const updatequestionImages = QuestionImage.bulkCreate({questionImages},
            {updateOnDuplicate:true},{where:{questionId:id}});
            return res.json(updatedQuestion,updatedquestionTags,updatequestionImages);
        
    } catch (error) {
        return res.status(500).json(error);
    }

}
exports.deleteQuestion = (req,res,next) =>{
    const id = req.params.qid;
    try {
        const question = Questions.destroy({where:{id}});
        const answers = Answers.destroy({where:{expertId:id}});
        const questionReacts = QuestionReacts.destroy({where:{questionId:id}});
        const questionComments = QuestionComments.destroy({where:{questionId:id}});
        return res.json({question,answers,questionReacts,questionComments}); 
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.addQuestionReact = (req,res) => {
    const {questionId,commitType,commiterType,commiterId} = req.body;
    try {
        const qReact = QuestionReacts.create({questionId,commitType,commiterType,commiterId});
        return res.json(qReact);
    } catch (error) {
        return res.status(500).json(error);
    }

}
exports.removeQuestionReact = (req,res) => {
    const {questionId,commiterId} = req.body;
    try {
        const qReact = QuestionReacts.destroy({where:{questionId,commiterId}});
        return res.json(qReact);
    } catch (error) {
        return res.status(500).json(error);
    }

}
// Answers
exports.getAnswers = (req,res,next) =>{ //getAnswerOfAQuestion *For Expert/Farmer Entity*
    const id = req.params.qid;
    try {
        const answers = Answers.findAll({where:{questionId:id}});
        return res.json(answers);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.addAnswer = (req,res,next) =>{ // For Expert Entity
    const eid = req.params.eid;
    const qid = req.params.qid;
    const {body} = req.body;
    try {
        const answer = Answers.create({body,questionId:qid,expertId:eid});
        return res.json(answer);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.editAnswer = (req,res,next) =>{ //For Expert Entity
    const {body} = req.body;
    const id= req.params.aid;
    try {
        const updatedAnswer = Answers.update({body},{where:{id}});
        return res.json(updatedAnswer);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

exports.deleteAnswer = (req,res,next) =>{
    const id = req.params.aid;
    try {
        const answer = Answers.destroy({where:{id}});
        return res.json(answer);
    } catch (error) {
        return res.status(500).json(error);
    }
}