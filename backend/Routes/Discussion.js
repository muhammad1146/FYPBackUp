const express = require ( 'express');
const DiscussionController = require ( '../Controllers/Discussion');
const router = express.Router();
//Questions

router.get('/',DiscussionController.getQuestions); // get Questions 

router.post('/',DiscussionController.addQuestion); //add Question post

router.put('/:qid',DiscussionController.editQuestion); // edit Question post

router.delete('/:qid',DiscussionController.deleteQuestion); // delete Question post 
//Answers 

router.get('/:qid/Answers',DiscussionController.getAnswers) // get Answers 

router.post('/:qid/Answers',DiscussionController.addAnswer); // Add Answer 

router.put('/:qid/Answers/:aid',DiscussionController.editAnswer); // edit answer

router.delete('/:qid/Answers/:aid',DiscussionController.deleteAnswer); // delete answer

router.post('/:qid/Answers/:aid',DiscussionController.addAnswerReact); // add Answer React

module.exports = router;