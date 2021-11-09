const express = require ( 'express');
const DiscussionController = require ( '../Controllers/Discussion');
const verifyToken = require('./verifyToken');
const router = express.Router();
//Questions  

router.get('/',verifyToken, DiscussionController.getQuestions); // get Questions

router.get('/:qid',verifyToken,DiscussionController.getQuestion); //get Question

router.post('/',verifyToken,DiscussionController.addQuestion); //add Question post

router.put('/:qid',verifyToken,DiscussionController.editQuestion); // edit Question post

router.delete('/:qid',verifyToken,DiscussionController.deleteQuestion); // delete Question post

router.post('/:qid',verifyToken,DiscussionController.addQuestionReact); // adding a question react



//Question Reports

router.post('/:qid/reports',verifyToken,DiscussionController.reportQuestion); // Reporting a question

//Answers 

router.get('/:qid/answers',verifyToken,DiscussionController.getAnswers); // get Answers 

router.get('/:qid/answers/:aid',verifyToken,DiscussionController.getAnswer);//get Answer

router.post('/:qid/answers',verifyToken,DiscussionController.addAnswer); // Add Answer 

router.put('/:qid/answers/:aid',verifyToken,DiscussionController.editAnswer); // edit answer

router.delete('/:qid/answers/:aid',verifyToken,DiscussionController.deleteAnswer); // delete answer

router.post('/:qid/answers/:aid',verifyToken,DiscussionController.addAnswerReact); // add Answer React

//Answer Reports
router.post('/:qid/answers/:aid/reports',verifyToken,DiscussionController.addAnswerReport); // add Answer Report

router.get('/tags',verifyToken,DiscussionController.getQuestionTags); // get all Tags from QuestionTagBox

router.post('/tags',verifyToken,DiscussionController.addTagToQuestionTagBox); // add new tag to QuestionTagBox

module.exports = router;