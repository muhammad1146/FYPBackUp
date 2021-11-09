const express = require ( 'express');
const EcommerceController = require ( '../Controllers/Ecommerce');
const verifyToken = require('./verifyToken');
const router = express.Router(); 

//Ecommerce Posts
router.get('/',verifyToken, EcommerceController.getAnimalPosts) // get animal posts 

router.get('/:pid',verifyToken,EcommerceController.getAnimalPost)  // get animal post

router.post('/',verifyToken,EcommerceController.addPost) // add animal post

router.put('/:pid',verifyToken,EcommerceController.editPost) // edit animal post

router.delete('/:pid',verifyToken,EcommerceController.deletePost) // delete animal post

router.get('/:pid/comments',verifyToken,EcommerceController.getPostComments) //get all Comments

router.post('/:pid/comments',verifyToken,EcommerceController.addPostComment) //add comment

router.delete('/:pid/comments/:cid',verifyToken,EcommerceController.deletePostComment) //delete comment

router.put('/:pid/comment/:cid',verifyToken,EcommerceController.editPostComment) //edit post comment

router.post('/:pid/rid',verifyToken, EcommerceController.addPostReact)  //add post react

router.put('/:pid/rid',verifyToken,EcommerceController.editPostReact) //editPostReact

// Animal Post Order
router.post('/:pid/orders',verifyToken,EcommerceController.orderEcommercePost) //orderEcommercePost

router.get('/:pid/orders',verifyToken,EcommerceController.getPostOrders) // Get All Orders of Post

router.put('/:pid/orders/:oid',verifyToken,EcommerceController.confirmOrder) //Accept one Order
//Post Reports

router.post('/:pid/reports',verifyToken,EcommerceController.reportEcommercePost); //Report Ecommerce Post to Admin

router.get('/:pid/reports',verifyToken,EcommerceController.getPostReport); //Get Post Report 

module.exports = router;


