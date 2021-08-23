const express = require ( 'express');

const EcommerceController = require ( '../Controllers/Ecommerce');

const router = express.Router(); 


router.get('/',EcommerceControllers.getAnimalPosts) // get animal posts

router.get('/:pid',EcommerceController.getAnimalPost)  // get animal post

router.post('/',EcommerceController.addPost) // add animal post

router.put('/:pid',EcommerceController.editPost) // edit animal post

router.delete('/:pid',EcommerceController.deletePost) // delete animal post

router.get('/:pid/comments',EcommerceController.getPostComments) // get all Comments

router.post('/:pid/comments',EcommerceController.addPostComment) // add comment

router.delete('/:pid/comments/:cid',EcommerceController.deletePostComment) // delete comment

router.put('/:pid/comment/:cid',EcommerceController.editPostComment) // edit post comment

router.post('/:pid/rid', EcommerceController.addPostReact)  // add post react

router.put('/:pid/rid',EcommerceController.editPostReact) // editPostReact

module.exports = router;


