const Joi = require('joi');
const {Posts,Farmers,PostComments,PostReacts,PostImages,AnimalPostOrders,EcommerceReport} = require('../models');
exports.getAnimalPosts = async (req,res)=>{
    try {  
        const AllPosts = await Posts.findAll();
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
exports.addPost = async (req,res)=>{
    //res.send("Post Request for adding Cattle");
    const schema = Joi.object({
        price: Joi.string().required(),
        weight:Joi.string().required(),
        cattleType:Joi.string().required(),
        description: Joi.string().required(),
        availability: Joi.string().required(),
        farmerId: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    if(error){
    }
    const {price,weight,cattleType,description,availability,date,farmerId} = req.body;
    const post = await Posts.create(
        {cattleType,description,availability,price,weight,date,farmerId}
    );
    res.json(post);
};
exports.editPost = async (req,res)=>{
    const Id = req.params.pid
    const schema = Joi.object( {
        price: Joi.string().required(),
        weight:Joi.string().required(),
        cattleType:Joi.string().required(),
        description: Joi.string().required(),
        availability: Joi.string().required(),
        farmerId: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
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
exports.deletePost = async (req,res)=>{
    // For Deleting Post 
    const postId = req.params.pid
 try {
    const comments = await PostComments.destroy({where:{postId}});
    const images = await PostImages.destroy({where:{postId}});
    const reacts = await PostReacts.destroy({where:{postId}});
    const orders = await AnimalPostOrders.destroy({where:{postId}});
    const post = await Posts.destroy({where:{id:postId}});
    return res.json(post,comments,images,reacts,orders);
    } catch (error) {
        return res.status(500).json(error);
    } 
 };
// Comments
exports.getPostComments = async (req,res)=>{
  const postId = req.params.pid;
  try {
      const comments = await PostComments.findAll({where:{postId}});
      res.json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
}
exports.addPostComment = async(req,res)=>{
    const postId = req.params.pid;
    const schema = Joi.object( {
        commentBody:Joi.string().required(),
        date:Joi.string().required(),
        commenterId: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const {commentBody,date,commenterId} = req.body;
    try {
        const comment = await PostComments.create({commentBody,date,commenterId,postId});
        return res.json(comment);
    } catch (error) {
       return res.status(500).json(error);   
    }
};
exports.deletePostComment =async (req,res)=>{
    const id = req.params.cid;
    try {
        const deletedComment = await PostComments.findAll({where:{id:cId}});
       return res.json(deletedComment)
    } catch (error) {
       return res.status(500).json(error);
    }
};
exports.editPostComment = async(req,res,next)=>{
    const cId = req.params.cid;
    const schema = Joi.object( {
        commentBody:Joi.string().required(),      
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
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
 const schema = Joi.object( {
    commitType:Joi.string().required(),
    date:Joi.string().required(),
    farmerId: Joi.string().required()
});

try {
    const value = await schema.validateAsync(req.body);
    
} catch (error) {
    res.status(400).send(error.details[0].message);
    return;
    
}
 const {commitType,date,farmerId} = req.body;
 try {
     const react = await PostReacts.create({commitType,date,farmerId,postId,farmerId});
     return res.json(react);
 } catch (error) {
    return res.status(500).json(error);
 }
};
exports.editPostReact = async (req,res) =>{
    const farmerId = req.params.id;
    const postId = req.params.pid;
    const schema = Joi.object( {
        commitType:Joi.string().required(),
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const {commitType} = req.body;
    try {
        const updatedReact = await PostReacts.update({commitType}, { where: { postId,farmerId}});
        return res.json(updatedReact);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Animal Post Orders
exports.orderEcommercePost = async(req,res) => {
    const postId = req.params.pid;
    const schema = Joi.object( {
        farmerId:Joi.string().required(),
        status:Joi.string().required(),
        message: Joi.string().required()
    });
    try {
        const {error} = await schema.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const {farmerId,status,message} = req.body; 
    try {
        const order = await AnimalPostOrders.create({postId,status,farmerId,message});
        return res.json(order);
    } catch (error) {
       return res.status(500).json(error);
    }
};
exports.getPostOrders = async(req,res) => {
const postId = req.params.pid;
try {
    const orders = await AnimalPostOrders.findAll({where:{postId}});
    return res.json(orders);
} catch (error) {
    return res.status(500).json(error);
}
};
exports.confirmOrder = async(req,res) => {
    const postId = req.params.pid;
    const id = req.params.oid;
    const status = "Accepted";
    try {
        const order = await AnimalPostOrders.update({where:{postId,id}},{status});
        return res.json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Ecommerce Post Reports
exports.getPostReport = async (req,res) =>{
    const reporterId = req.params.id;
    const postId = req.params.pid;
    try {
        const report = await EcommerceReport.findOne({ where: { postId,reporterId}});
        return res.json(report);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.reportEcommercePost = async (req,res) =>{
    const postId = req.params.pid;
    const date = new Date();
    const schema = Joi.object( {
        reporterId:Joi.string().required(),
        reportDescription: Joi.string().required(),
        reportStatus: Joi.string().required(),
        reportType: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const {reporterId,reportDescription,reportStatus,reportType} = req.body;
    try {
        const report = await EcommerceReport.create({postId,reporterId,reportDescription,reportStatus,date,reportType});
        return res.json(report);
    } catch (error) {
        return res.status(500).json(error);
    }
}