    const { Sequelize, DataTypes } = require('sequelize');
const {Posts,Farmers,PostComments,PostReacts} = require('../models');
exports.getAnimalPosts = async (req,res,next)=>{
    try {
        const AllPosts = await Posts.findAll({include:[Farmers,PostComments,PostReacts]});
        return res.json(AllPosts);
    } catch (error) {
        return res.status(500).json(error);
    }


};
exports.getAnimalPost = async (req,res) =>{
    const id = req.params.pid;
    try {
        const Post = await Posts.findOne({include:[Farmers,PostComments,PostReacts]},{where: {id}});
        return res.json(Post);       
    } catch (error) {
        return res.status(500).json(error);
    }

}


exports.addPost = async (req,res,next)=>{
    //res.send("Post Request for adding Cattle");
    const {price,weight,cattleType,description,availability,date,farmerId} = req.body;
    const post = await Posts.create(
        {cattleType,description,availability,price,weight,date,farmerId}
    );
    res.json(post);

};

exports.editPost = (req,res,next)=>{
    // we can update bot availability and other attributes
    //res.send("Edit Request for a Cattle");
    const Id = req.params.pid
    const {price,weight,cattleType,description,availability,checkForAvailability} = req.body
    if(checkForAvailability){
        try {
            const updated = await Posts.update({availability}, {where:{Id}});
            return res.json(updated);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else{

        try {
            const newPost = await Posts.update({price,weight,cattleType,description,availability})
            return res.json(newPost);
        } catch (error) {
            return res.status(500).json(error);
        }
        
    }
};

exports.deletePost = (req,res,next)=>{
   // For Deleting Post 
   const Id = req.params.pid
   try {
       const deletedPost = await Posts.destroy({where:{id:Id}});
       return res.json(deletedPost);
   } catch (error) {
       return res.status(500).json(error);
   } 
};
// Comments
exports.getPostComments = async (req,res,next)=>{
  const farmerId = req.params.id;
  const postId = req.params.pid;
  try {
      const comments = await PostComments.findAll({where:{postId}});
      res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }

}
exports.addPostComment = async(req,res)=>{
    res.send("Post Request for adding Cattle's comment");
    const postId = req.params.pid;
    const {commentBody,date,commenterId} = req.body;
    try {
        const comment = await PostComments.create({commentBody,date,commenterId,postId});
        return res.json(comment);
    } catch (error) {
        
       return res.status(500).json(error);
        
    }

};

exports.deletePostComment =async (req,res)=>{
    const cId = req.params.cid;
    try {
        const deletedComment = await PostComments.findAll({where:{id:cId}});
       return res.json(deletedComment)
    } catch (error) {
       return res.status(500).json(error);
    }

};

exports.editPostComment = async(req,res,next)=>{
    const cId = req.params.cid;
    const {commentBody} = req.body;
    try {
        const updatedComment = await PostComments.update({commentBody},{where:{id:cId}});
        return res.json(updatedComment);
    } catch (error) {
       return res.status(500).json(error);
    }
};

exports.addPostReact = async(req,res) => {
 const postId = req.params.pid;
 const {comitType,date,farmerId} = req.body;

 try {
     const react = await PostReacts.create({comitType,date,farmerId,postId,farmerId});
     return res.json(react);
 } catch (error) {
    return res.status(500).json(error);
 }


}

exports.editPostReact = async (req,res) =>{
    const farmerId = req.params.id;
    const postId = req.params.pid;
    const {comitType} = req.body;
    try {
        const updatedReact = await PostReacts.update({comitType}, { where: { postId,farmerId}});
        return res.json(updatedReact);
    } catch (error) {
        return res.status(500).json(error);
    }
}

