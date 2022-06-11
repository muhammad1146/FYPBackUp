const express = require ( 'express');
const DiscussionController = require ( '../Controllers/Discussion');
const verifyToken = require('./verifyToken');
const router = express.Router();
//Questions  
router.get('/tags',verifyToken,DiscussionController.getDiscussionTags); // get all Tags from QuestionTagBox

router.get('/tags/search',verifyToken,DiscussionController.searchTags); // search all Tags from QuestionTagBox

router.get('/alltags/:tid',verifyToken,DiscussionController.getQuestionTag); // get all Tags from QuestionTagBox

router.delete('/tags/:tid',verifyToken,DiscussionController.deleteQuestionTag); // get all Tags from QuestionTagBox

router.get('/tags/:id',verifyToken, DiscussionController.getTagQuestions); // get Questions

router.post('/tags',verifyToken,DiscussionController.addTagToQuestionTagBox); // add new tag to QuestionTagBox

router.get('/',verifyToken, DiscussionController.getQuestions); // get Questions

router.get('/search',verifyToken, DiscussionController.searchQuestions); // get Questions

router.get('/my',verifyToken, DiscussionController.getMyQuestions); // get Questions

router.get('/:qid',verifyToken,DiscussionController.getQuestion); //get Question

router.post('/',verifyToken,DiscussionController.addQuestion); //add Question post (image included)

router.put('/:qid',verifyToken,DiscussionController.editQuestion); // edit Question post

router.delete('/:qid',verifyToken,DiscussionController.deleteQuestion); // delete Question post

router.post('/:qid/reacts',verifyToken,DiscussionController.addQuestionReact); // adding a question react

router.get('/:qid/reacts',verifyToken,DiscussionController.getQuestionReacts); // getting question reacts

router.delete('/:qid/reacts',verifyToken,DiscussionController.deleteQuestionReacts); // getting question reacts

//Question Comments 
router.post('/:qid/comments',verifyToken,DiscussionController.addQuestionComment); // adding a question comment

router.get('/:qid/comments',verifyToken,DiscussionController.getQuestionComments); // adding a question comment



router.delete('/:qid/comments/:commentid',verifyToken,DiscussionController.deleteQuestionComment); // adding a question react

//Question Reports

router.post('/:qid/reports',verifyToken,DiscussionController.reportQuestion); // Reporting a question

//Answers 

router.get('/:qid/answers',verifyToken,DiscussionController.getAnswers); // get Answers 

router.get('/:qid/answers/:aid',verifyToken,DiscussionController.getAnswer);//get Answer

router.post('/:qid/answers',verifyToken,DiscussionController.addAnswer); // Add Answer (image included) 

router.put('/:qid/answers/:aid',verifyToken,DiscussionController.editAnswer); // edit answer

router.delete('/:qid/answers/:aid',verifyToken,DiscussionController.deleteAnswer); // delete answer

router.post('/:qid/answers/:aid',verifyToken,DiscussionController.addAnswerReact); // add Answer React

//Answer Reports
router.post('/:qid/answers/:aid/reports',verifyToken,DiscussionController.addAnswerReport); // add Answer Report


module.exports = router;