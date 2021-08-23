const express = require( 'express');
const BlogController = require( '../Controllers/Blogs');
const router = express.Router();

//Blog 

router.post("/",BlogController.addBlog); // add new blog

router.get("/",BlogController.getBlogs); // get all blogs

router.get('/:bid',BlogController.getBlog); // get single Blog

router.put("/:bid",BlogController.editBlog); // edit a blog

router.delete("/:bid",BlogController.deleteBlog); // delete a blog

 
//Blog Comments

router.get("/:id/blogcomments",BlogController.GetBlogComments); // get Blog Comments

router.post('/blogcomments',BlogController.addBlogComment); // add Blog Comments

router.put("/:id/blogcomments/:bcid",BlogController.editBlogComments); // edit Blog comments

router.delete("/:id/blogcomments/:bcid",BlogController.deleteBlog); // delete blog comments


//Blog Reacts

router.get("/:id",BlogController.getBlogReacts); // get All Blog Reacts

router.post('/id',BlogController.addBlogReact); // add Blog React

router.put('/id',BlogController.editBlogReact); // change/edit Blog React

//Blog Tags 

router.get("/tags",BlogController.getAllBlogTags); // get all Tags from Tag Box

router.post('/tags',BlogController.addTag); // add new tag to tags box

//Blog Reports

router.post('/blogreports',BlogController.addBlogReport); // add report Blog

router.delete('/blogreports/:brid',BlogController.deleteBlogReport); // delete a blog report

router.get('/blogreports', BlogController.getBlogReport); // get all blog reports of current user


module.exports = router;