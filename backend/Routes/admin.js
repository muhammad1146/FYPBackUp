const express = require('express');
const AdminController = require('../Controllers/Admin');
const router = express.Router();
// delete answer 
router.delete("/Questions/:id/Answers/:aid",AdminController.deleteAnswer); 
// Expert
// add expert 
router.post("/experts",AdminController.addExpert);
// edit expert
router.put("/experts/:id",AdminController.editExpert);
//Farmers
// delete user
router.delete("/users/:id", AdminController.deleteUser)
// delete question
router.delete("/Questions/:id",AdminController.deleteQuestion);
// * Blogs *
// edit Blog
// delete blog
router.delete("/blogs/:id",AdminController.deleteBlog)
// 



module.exports = router; 