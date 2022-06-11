const express = require ( 'express');
const EcommerceController = require ( '../Controllers/Ecommerce');
const verifyToken = require('./verifyToken');
const router = express.Router();
const upload = require('../Controllers/ImageManagement'); 

//Ecommerce Posts
router.get('/',verifyToken, EcommerceController.getPosts) // get animal posts (testing:done)

router.get('/search',verifyToken, EcommerceController.searchPosts) // get animal posts (testing:done)

router.get('/myreports',verifyToken,EcommerceController.getAllUserReports); //Get All Reports reported by a user.

router.get('/:pid',verifyToken,EcommerceController.getAnimalPost)  // get animal post(testing:done)

router.post('/',verifyToken,upload.array("cattleImages",5) ,EcommerceController.addPost) // add animal post (images included)(testing:done)

router.put('/:pid',verifyToken ,EcommerceController.editPost) // edit animal post(testing:done)

router.delete('/:pid',verifyToken,EcommerceController.deletePost) // delete animal post (testing:done)

router.get('/:pid/comments',verifyToken,EcommerceController.getPostComments) //get all Comments(testing:done)

router.post('/:pid/comments',verifyToken,EcommerceController.addPostComment) //add comment(testing:done)

router.delete('/:pid/comments/:cid',verifyToken,EcommerceController.deletePostComment) //delete comment

router.put('/:pid/comments/:cid',verifyToken,EcommerceController.editPostComment) //edit post comment(testing:done)

router.post('/:pid/reacts',verifyToken, EcommerceController.addPostReact)  //add post react(testing:done)

router.delete('/:pid/reacts/:rid',verifyToken,EcommerceController.deletePostReact) //editPostReact 

// Animal Post Order

router.post('/:pid/orders',verifyToken,EcommerceController.orderEcommercePost) //orderEcommercePost (testing:done)
router.get('/:pid/orders',verifyToken,EcommerceController.getPostOrders) // Get All Orders of Post (testing:done)
router.delete('/:pid/orders/:oid',verifyToken,EcommerceController.deletePostOrder)

router.put('/:pid/orders/:oid',verifyToken,EcommerceController.confirmOrder) //Accept one Order (testing:done)
//Post Reports

router.post('/:pid/reports',verifyToken,EcommerceController.reportEcommercePost); //Report Ecommerce Post to Admin


module.exports = router;


