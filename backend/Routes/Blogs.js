const express = require( 'express');
const BlogController = require( '../Controllers/Blogs');
const expertVerify = require('./expertVerify');
const verifyToken = require('./verifyToken');
const router = express.Router();

router.get("/tags",verifyToken, BlogController.getAllBlogTags); // get all Tags from Tag Box

router.post('/tags',verifyToken,expertVerify,BlogController.addBlogTag); // add new tag to tags box

router.get("/myblogs",verifyToken,expertVerify ,BlogController.getExpertBlogs); // get all blogs 
 
router.get("/myblogs/:bid",verifyToken, expertVerify,BlogController.getExpertBlog); // get all blogs 
//Blog  
router.post("/",verifyToken,expertVerify,BlogController.addBlog); // add new blog

router.get("/",verifyToken,BlogController.getBlogs); // get all blogs 
// router.get("/specific/:tags",verifyToken,BlogController.getSpecificTagBlogs); // get all blogs 
router.get('/:bid',verifyToken,BlogController.getBlog); // get single Blog for non-owners

router.put("/:bid",verifyToken,BlogController.editBlog); // edit a blog for owners

router.delete("/:bid",verifyToken,BlogController.deleteBlog); // delete a blog
//Blog Comments
router.get("/:bid/blogcomments",verifyToken,BlogController.getBlogComments); // get Blog Comments

router.post('/:bid/blogcomments',verifyToken,BlogController.addBlogComment); // add Blog Comments

router.put("/:bid/blogcomments/:bcid",verifyToken,BlogController.editBlogComment); // edit Blog comments

router.delete("/:id/blogcomments/:bcid",verifyToken,BlogController.deleteBlogComment); // delete blog comments
//Blog Reacts
router.get("/:bid/reacts",verifyToken,BlogController.getBlogReacts); // get All Blog Reacts

router.post('/:bid/reacts',verifyToken,BlogController.addBlogReact); // add Blog React

router.put('/:bid/reacts/:rid',verifyToken,BlogController.editBlogReact); // change/edit Blog React
//Blog Tags 
//Blog Reports
router.post('/:bid/blogreports',verifyToken,BlogController.addBlogReport); // add report Blog

router.delete('/:bid/blogreports/:brid',verifyToken,BlogController.deleteBlogReport); // delete a blog report

router.get('/:bid/blogreports', verifyToken,BlogController.getBlogReports); // get all blog reports of current user

module.exports = router; 