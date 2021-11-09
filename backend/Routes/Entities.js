const express = require ( 'express');
const EntitiesController = require ( '../Controllers/Entities');
const verifyToken = require('./verifyToken');
const adminVerify = require('./adminVerify');
const router = express.Router();
// These endpoints are for admin  
//Farmer
router.put("/farmers/:id",verifyToken,adminVerify,EntitiesController.changeFarmerStatus); // block/unblock Farmer's Account
 
//Farmer Reports
router.get('/farmers/reports',verifyToken,adminVerify,EntitiesController.getReportedFarmers); //get All Reported Farmers

router.get('/farmers/:id/reports',verifyToken,adminVerify,EntitiesController.getFarmerReports); //get Farmer's Reports

router.get('/farmers/:id/reports/:frid',verifyToken,adminVerify,EntitiesController.getFarmerReport); //get Farmer's Report

router.put('/farmers/:id/reports/:frid',verifyToken,adminVerify,EntitiesController.respondToFarmerReport);//Respond on Farmer's Report

// Experts 
router.put("/experts/:eid",verifyToken,adminVerify, EntitiesController.changeExpertStatus); // block/unblock expert

//Experts Reports

router.get("/experts/reports",verifyToken,adminVerify,EntitiesController.getReportedExperts) // get reported Experts

router.get('/experts/:eid/reports',verifyToken,adminVerify,EntitiesController.getExpertReports); //get Expert Reports

router.get('/farmers/:eid/reports/:erid',verifyToken,adminVerify,EntitiesController.getExpertReport); //get Expert Report

router.put('/farmers/:eid/reports/:erid',verifyToken,adminVerify,EntitiesController.respondToExpertReport);//Respond/edit on Expert Report
 
// Questions
router.delete ('/questions/:qid',verifyToken,adminVerify,EntitiesController.deleteQuestion); // delete question

//Question Reports
router.get('/questions/reports',verifyToken,adminVerify,EntitiesController.getReportedQuestions) // get all reported questions 

router.get('/questions/:qid/reports',verifyToken,adminVerify,EntitiesController.getQuestionReports); // Get all reports of a single Question 

router.get('/questions/:qid/reports/:qrid',verifyToken,adminVerify,EntitiesController.getQuestionReport); // Get Question Report

router.put('/questions/:qid/reports/:qrid',verifyToken,adminVerify,EntitiesController.respondToQuestionReport); //Respond on Report of a question

// Answer
router.delete('/questions/:qid/answers/:aid',verifyToken,adminVerify,EntitiesController.deleteAnswer) // delete answer

//Answer Reports

router.put('/questions/:qid/answers/:aid/reports/:arid',verifyToken,adminVerify,EntitiesController.respondToAnswerReport); //Respond/edit each answer report

router.get('/questions/:qid/answers/reports',verifyToken,adminVerify,EntitiesController.getReportedAnswers); //get all reported answers

router.get('/question/:qid/answers/:aid/reports',verifyToken,adminVerify,EntitiesController.getAnswerReports); //get All Reports to amswer

router.get('/question/:qid/answers/:aid/reports/:arid',verifyToken,adminVerify,EntitiesController.getAnswerReport); //get one Report to answer

// Posts
router.delete("/ecommerce/:pid",verifyToken,adminVerify,EntitiesController.deletePost); // delete an ecommerce post

// Post Reports

router.get('/ecommerce/reports',verifyToken,adminVerify,EntitiesController.getReportedPosts) // getting all reported ecommerce posts

router.get('/ecommerce/:pid/reports',verifyToken,adminVerify,EntitiesController.getPostReports); //get all reports on an ecommerce Post

router.get('/ecommerce/:pid/reports/:prid',verifyToken,adminVerify,EntitiesController.getPostReport); //Get Report of Any Post

router.put('/ecommerce/:pid/reports/:prid',verifyToken,adminVerify,EntitiesController.respondToPostReport); //Respond/edit on Post Report

// blog
router.delete('/blogs/:bid',verifyToken,adminVerify, EntitiesController.deleteBlog);  // delete specific blog

//Blog Reports
router.get('/blogs/reports',verifyToken,adminVerify, EntitiesController.getReportedBlogs); // getting all reported blog

router.get('/blogs/:bid/reports',verifyToken,adminVerify, EntitiesController.getBlogReports); // get All Blog Reports

router.get('/blogs/:bid/reports/:brid',verifyToken,adminVerify,EntitiesController.getBlogReport); //Get Blog Report

router.put('/blogs/:bid/reports/:brid',verifyToken,adminVerify,EntitiesController.respondToBlogReport); //Respond/edit Blog Report
 
module.exports = router;