const express = require ( 'express');
const AdminController = require ( '../Controllers/Admin');
const router = express.Router();

// These endpoints are for admin 
// Farmers
router.post("/farmers",AdminController.addFarmer) // add farmer

router.put("/farmers/:id",AdminController.updateUserInfo) // edit a farmer

router.get("/farmers",AdminController.getUsers) // get farmers

router.get('/farmers/:id',AdminController.getFarmer) // get farmer

router.delete("/farmers/:id",AdminController.deleteUser) // delete farmer

// Experts
router.get("/experts/reports",AdminController.getReportedExperts) // get reported Experts 

router.get('/experts/:eid',AdminController.getExpert) // get Experts 

router.post('/experts',AdminController.addExpert) // add Expert

router.put("/experts/:id",AdminController.editExpert) // edit Expert 

router.delete("/experts/:id",AdminController.deleteExpert) // delete Expert

// Questions
router.get('/questions/reports', AdminController.getQuestionReports) // get reported questions 

router.get('/questions/:qid' , AdminController.getReportedQuestion) // get single reporte Q

router.delete ('/questions/:qid',AdminController.deleteQuestion); // delete question

router.put('/questions/:qid',AdminController.handleReportedQuestion); // respond on reported


// Answer
router.put('/questions/:qid/answers/:aid',AdminController.handleReportedAnswer); //edit answer

router.get('/questions/:qid/answers/reports',AdminController.getAnswerReports); //edit answer

router.delete('/questions/:qid/answers/:aid',AdminController.deleteAnswer) // delete answer

// Posts

router.get('/ecommerce/reports',AdminController.getPostReports) // getting all reported posts

router.get('/ecommerce/:pid', AdminController.getPost) // get a reported post

router.put('/ecommerce/:pid', AdminController.handleReportedPost); // respond on reported post

router.delete('/ecommerce/:pid',AdminController.deletePost); // delete specific post



// blog
router.get('/blogs/reports',AdminController.getBlogReports); // getting all reported blog

router.get('/blogs/:bid',AdminController.getBlog); // get a reported blog

router.put('/blogs/:bid',AdminController.handleBlogReports) // respond on reported blogs

router.delete('/blogs/:bid',AdminController.deleteBlog)  // delete specific blog




module.exports = router;