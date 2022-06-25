const Joi = require('joi');
const dbDebugger = require('debug')('app:db')
const fs = require('fs');
const { Op } = require('sequelize');
const {Posts,Farmers,PostComments,PostReacts,PostImages,AnimalPostOrders,EcommerceReport,FarmersRank} = require('../models');
exports.getPosts = async (req,res)=>{
    let price = (req.query.price? req.query.price:0);
   let city = (req.query.city ? req.query.city:null);
   let type = (req.query.type? req.query.type:null); //cattleType
   let availability = req.query.availability;
   
   let pType = (req.query.ptype==='my'?req.query.ptype:null);
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(Number.isNaN(price) && (price<0)){
        price = 0;
    }
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    } 
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    } 
    try { 
        let AllPosts = null;
        if(pType){
            let farmer = await Farmers.findOne({attributes:['id'],where:{
                uuid:req.user.uuid
            }});
            if(farmer){
                
                AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{farmerId:farmer.id},include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts, include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});

            }else {
               return res.status(401).json({error:"Farmer not Found!"});
            }
                
        }
        else if(city!='All' && type!="All"){
            console.log("both city and type is true")
            AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{cattleType:type,city,availability:availability?availability:'A'},include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts, include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});
        }
        else if(city==='All' && type !='All')
        {
            console.log("City is yes and type is no")
            AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{cattleType:type,availability:availability?availability:'A'},include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts,include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});
        }
        else if(city!="All" && type==='All'){
            AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{city,availability:availability?availability:'A'},include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts,include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});
        }
        else {
            console.log("not city and no type!");
            AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{availability:availability?availability:'A'},include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts,include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});
        } 
        dbDebugger("GetAnimalPosts db fetching passed!!");
        return res.json({content:AllPosts.rows,
        totalPages:Math.ceil(AllPosts.count / Number.parseInt(size))
    });
    } catch (error) {
        console.log(error)
        return res.status(501).json(error);
    }
};

exports.searchPosts = async (req,res)=>{
    let search = req.query.search;
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    } 
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    } 
    try { 
            let farmer = await Farmers.findOne({attributes:['id'],where:{
                uuid:req.user.uuid}});
                let AllPosts ;
            if(farmer){
             AllPosts = await Posts.findAndCountAll({attributes:{exclude:['farmerId']},where:{farmerId:farmer.id},where:{
                    [Op.or]:[
                        {name: {[Op.iLike] : '%' + search + '%'} },
                        {description: {[Op.iLike]: '%' + search + '%'}},
                        {city:{[Op.iLike]: '%' + search + '%'}}
                    ],availability:'A'
                },include:[{model:Farmers,attributes:['userName','profileImage']},{model:PostImages,attributes:['image']},{model:PostReacts, include:[{model:Farmers,attributes:['userName','uuid']}]}]},{limit:size,offset:size*page});

            }else {
               return res.status(401).json({error:"Farmer not Found!"});
            }
        
        dbDebugger("GetAnimalPosts db fetching passed!!");
        return res.json({content:AllPosts.rows,
        totalPages:Math.ceil(AllPosts.count / Number.parseInt(size))
    });
    } catch (error) {
        console.log(error)
        return res.status(501).json(error);
    }
};
exports.getAnimalPost = async (req,res) =>{
    const postId = req.params.pid;
    const isMine = false;
    console.log("reached the animal get route!");
    try {
        // console.log(uuid);
        let animalPost;
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
       
        let post = await Posts.findOne({attributes:['farmerId'],where:{uuid:postId}});
       
       if(farmer && post && (farmer.id === post.farmerId)){
         animalPost = await Posts.findOne({attributes:{exclude:['farmerId']},where:{uuid:postId},include:
         [
             {model:Farmers,attributes:{exclude:['password']},include:[{model:FarmersRank,attributes:["rankname"]}]},
             {model:PostImages,required:true,attributes:['image']},{model:PostReacts},
        ]}) 
         console.log(farmer.id," ",post.farmerId," mine post!!");
        }else{
            animalPost = await Posts.findOne({attributes:{exclude:['farmerId']},where:{uuid:postId},
            include:
            [
                {model:Farmers,attributes:{exclude:['password','createdAt','updatedAt','description','farmingType','address']},include:[{model:FarmersRank,attributes:["rankname"]}]},{model:PostImages,required:true,attributes:['image']},{model:PostReacts,attributes:['commitType']},{model:AnimalPostOrders,include:[{model:Farmers,attributes:["id","uuid"]}]},
        ]});
        console.log(farmer.id," ",post.farmerId," not mine post!!");
        console.log(animalPost)

        }
        // console.log(post)
        dbDebugger("GetAnimalPost db fetching passed!!");
        return res.json({animalPost});       
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
exports.addPost = async (req,res)=>{
    //res.send("Post Request for adding Cattle")
    const schema = Joi.object({
        price: Joi.string().required(),
        weight:Joi.string().required(),
        cattleType:Joi.string().required(),
        description: Joi.string().required(),      
        name: Joi.string(),
        city:Joi.string().required()       
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;}
        
        let uuid = req.user.uuid, farmerId,postId;

    let images = req.files.map(img=>{
        return img.filename;
    }),postImages =[];
    console.log(req.file);

    const {price,weight,cattleType,description,name,city} = req.body;
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}})
        if(farmer.id) farmerId= farmer.id;
        else return res.status(401).send("Farmers in not valid for this operation!");
        
        const post = await Posts.create({name,cattleType,description,price,weight,farmerId,city});
        if(post.id) postId= post.id
        postImages = images.map(img =>
            {
            let obj = {}
                obj.image=img,
                obj.postId=postId
                return obj;
            })
        const pictures = await PostImages.bulkCreate(postImages,{returning:true});
        dbDebugger("addAnimalPost db posting passed!!");
        return res.json({post,pictures});
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }

};
exports.editPost = async (req,res)=>{
    const Id = req.params.pid
    console.log("inside edit post!!")
    
    const schema = Joi.object( {
        name:Joi.string().required(),
        price: Joi.number().required(),
        weight:Joi.number().required(),
        cattleType:Joi.string().required(),
        description: Joi.string().required(),
        availability: Joi.string().required(),
        city: Joi.string().required(),
    });
    try {
        const value = await schema.validateAsync(req.body);  
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const uuid = req.user.uuid;
    console.log(req.body);
    const {price,weight,cattleType,description,availability,city,name} = req.body
    try { 
            let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
            let post = await Posts.findOne({attributes:['farmerId'],where:{uuid:Id}});
            if((farmer && post) && (farmer.id === post.farmerId) ) {
            const updated = await Posts.update({availability,price,weight,cattleType,description,city,name}, {where:{uuid:Id}});
            dbDebugger("editAnimalPost db editing passed!!");   
            return res.json(updated);
            }else 
            {
            return res.status(501).json({error:"User not valid for this operation!"});
            }
        } catch (error) {
            return res.status(500).json({error});
        }
};
exports.deletePost = async (req,res)=>{
    // For Deleting Post 
    const postId = req.params.pid
    let uuid = req.user.uuid;
    let imagePath = 'backend/uploads';
 try {
     console.log("Delete ecommerce post route reached!")
    let farmer = await Farmers.findOne({attributes:['id'], where:{uuid}});
    let currentPost = await Posts.findOne({attributes:["id","farmerId"],where:{uuid:postId}});
    // console.log(farmer.id, " " , currentPost.farmerId);
if((farmer.id && currentPost.farmerId) && (farmer.id === currentPost.farmerId) ){
        const comments = await PostComments.destroy({where:{postId:currentPost.id}});
        let postImages = await PostImages.findAll({attributes:['image'],where:{postId:currentPost.id}});
        function deleteFileCallback(error){
            if(error){
                return res.status(400).json({error:error.message});
            }
        }
        // console.log(postImages[0].dataValues.image);
        dbDebugger("deleteAnimalPostComments db process passed!!");
        const images = await PostImages.destroy({where:{postId:currentPost.id}});

        dbDebugger("deleteAnimalPostImages db process passed!!");
        const reacts = await PostReacts.destroy({where:{postId:currentPost.id}});
        dbDebugger("deleteAnimalPostReacts db process passed!!");
        const orders = await AnimalPostOrders.destroy({where:{postId:currentPost.id}});
        dbDebugger("deleteAnimalPostOrders db process passed!!");
        const post = await Posts.destroy({where:{id:currentPost.id}});
        dbDebugger("deleteAnimalPost db process passed!!");
        return res.json({post,comments,images,reacts,orders,postImages});
    }else {
    return res.status(501).json({error:"User not valid for this operation!"});
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    } 
 };
// Comments
exports.getPostComments = async (req,res)=>{
  const postId = req.params.pid;
  let page= req.query.commentpage;
 
  try {
      let post = await Posts.findOne({attributes:['id'],where:{uuid:postId}});
      (!post) && (res.status(404).json({error:"Post not Found!!"}));
      const comments = await PostComments.findAndCountAll({where:{postId:post.id},include:[{model:Farmers,attributes:['userName','profileImage']}]},{limit:7,offset:7*page});
       res.json({comments});
  } catch (error) 
  {
    return res.status(500).json({error});
  }
}
exports.addPostComment = async(req,res)=>{
    const postId = req.params.pid;
    let uuid = req.user.uuid;
    let type = req.user.type;
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
    (type!='F') && ( res.status(501).json({error:"This User in not valid for this operation!"}))
    let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
    let post = await Posts.findOne({attributes:['id'],where:{uuid:postId}});
    (!farmer.id) && ( res.status(404).json({error:"This User is not found!"}))
    (!post.id) && ( res.status(404).json({error:"This Post is not found!"}))

    const comment = await PostComments.create({commentBody,farmerId:farmer.id,postId:post.id});
    dbDebugger("addAnimalPostComment db process passed!!");

        return res.json({comment});
    } catch (error) {
       return res.status(500).json({error});   
    }
};
exports.deletePostComment =async (req,res)=>{
    const id = req.params.cid;
    try {
        const deletedComment = await PostComments.destroy({where:{id}});
    dbDebugger("deleteAnimalPostComment db process passed!!");
       return res.json({deletedComment})
    } catch (error) {
       return res.status(500).json({error});
    }
};
exports.editPostComment = async(req,res,next)=>{
    const cId = req.params.cid;
    const postId = req.params.pid;
    const uuid = req.user.uuid;
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
        let post = await Posts.findOne({attributes:['farmerId','id'],where:{uuid:postId}});
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        (!post || !farmer) && (res.status(401).json({error:"Internal Server Error!"})) 
            let comment = await PostComments.findOne({attributes:['postId','farmerId'],where:{id:cId}});
            if(comment && (comment.postId===post.id) && (comment.farmerId===farmer.id)){ //
                const updatedComment = await PostComments.update({commentBody},{where:{id:cId},returning:true});
                dbDebugger("updateAnimalPostComment db process passed!!");
                return res.json({updatedComment});
            } else {
                return res.status(500).json({error:"Invalid Post/Comment!"});
            }
    } catch (error) {
       return res.status(500).json({error});
    }
};
exports.addPostReact = async(req,res) => {
 const postId = req.params.pid;
 const uuid = req.user.uuid;
 const schema = Joi.object( {
    commitType:Joi.string().required()
});
try {
    const value = await schema.validateAsync(req.body);
} catch (error) {
    res.status(400).send(error.details[0].message);
    return; 
}
 const {commitType} = req.body;
 let farmerId;
 try {
     let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
     let post = await Posts.findOne({attributes:['id'],where:{uuid:postId}});
     if(farmer.id && post.id) farmerId=farmer.id
     else return res.status(501).json({error:"Internal Server Error!!"});
     const react = await PostReacts.create({commitType,farmerId,postId:post.id});
    dbDebugger("addAnimalPostReact db process passed!!");

     return res.json({react});
 } catch (error) {
    return res.status(500).json({error});
 }
};
exports.deletePostReact = async (req,res) =>{
    const rid = req.params.rid;
    
    try {
        const deletedReact = await PostReacts.destroy({ where: { id:rid}});
    dbDebugger("editAnimalPostComment db process passed!!");

        return res.json(deletedReact);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Animal Post Orders
exports.orderEcommercePost = async(req,res) => {
    const postId = req.params.pid;
    console.log(req.body)
    const schema = Joi.object( {
        message: Joi.string().required()
    });
    try {
        const {error} = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const {message} = req.body; 
    let farmerId;
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
        let post = await Posts.findOne({attributes:['id','farmerId'],where:{uuid:postId}})
        if(farmer.id && post.id){
            if(farmer.id===post.farmerId){
                return res.status(501).json({error:"You cannot order your own Post!!"});
            }
        farmerId=farmer.id;
        const order = await AnimalPostOrders.create({postId:post.id,farmerId,message});
        dbDebugger("addAnimalPostOrder db process passed!!");
        return res.json({order});
        }else {
            return res.status(501).json({error:"User not allowed for this operation!!"});
        }
    } catch (error) {
       return res.status(500).json({error});
    }
};
// exports.editEcommercePostOrder = async(req,res) => {
//     const postId = req.params.pid;
//     const id = req.params.pod;
//     const schema = Joi.object( {
//         farmerId:Joi.string().required(),
//         status:Joi.string().required(),
//         message: Joi.string().required()
//     });
//     try {
//         const {error} = await schema.validateAsync(req.body);
//     } catch (error) {
        
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     const {farmerId,status,message} = req.body; 
//     try {
//         const order = await AnimalPostOrders.update({postId,status,farmerId,message},{where:id});
//     dbDebugger("updateAnimalPostOrder db process passed!!");
//         return res.json(order);
//     } catch (error) {
//        return res.status(500).json(error);
//     }
// };
exports.getPostOrders = async(req,res) => {
const postId = req.params.pid;
const uuid = req.user.uuid;
try {
    let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
    let post = await Posts.findOne({attributes:['id','farmerId'],where:{uuid:postId}});
    if(farmer.id && post.farmerId && (farmer.id===post.farmerId)){
        const orders = await AnimalPostOrders.findAll({where:{postId:post.id},include:[{model:Farmers,attributes:['userName','uuid','profileImage']}]});
        dbDebugger("getAnimalPostsOrders db process passed!!");
        return res.json({orders});
    }else{
        return res.status(501).json({error:"This Post does not belongs to you!!"});
    }
} catch (error) {
    return res.status(500).json({error});
}
};
exports.deletePostOrder = async(req,res) => {
    const id = req.params.oid;
    const uuid = req.user.uuid;
    console.log("reched deletePostOrder")
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        // let post = await Posts.findOne({attributes:['id','farmerId'],where:{uuid:postId}});
        // if(farmer.id && post.farmerId && (farmer.id===post.farmerId)){
            const orders = await AnimalPostOrders.destroy({where:{id}});
            dbDebugger("getAnimalPostsOrders db process passed!!");
            return res.json({orders});
        // }else{
            return res.status(501).json({error:"This Post does not belongs to you!!"});
        // }
    } catch (error) {
        return res.status(500).json({error});
    }
    };
exports.confirmOrder = async(req,res) => {
    const postId = req.params.pid;
    const id = req.params.oid;
    const uuid = req.user.uuid;
    const schema = Joi.object( {
        status: Joi.string().required(), 
    });
    try {
        const {error} = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const {status} = req.body;
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        let post = await Posts.findOne({attributes:['id','farmerId'],where:{uuid:postId}});
        if(farmer.id && post.farmerId && (farmer.id===post.farmerId)){
        if(status==='Accepted') {
            const previousOrders =  await AnimalPostOrders.update({status:'Pending'},{where:{postId:post.id, status:'Accepted'}});
        }
        const order = await AnimalPostOrders.update({status},{where:{postId:post.id,id},returning:true});
        let newPost;
        if(status==="Accepted"){
            let availability="NA"
             newPost = await Posts.update({availability},{where:{id:post.id},returning:true});
        } else {
            availability = 'A';
            newPost = await Posts.update({availability},{where:{id:post.id},returning:true}); 
        }
        dbDebugger("AnimalPostConfirm db process passed!!");
        return res.json(order);
        }else{
            res.status(501).json({error:"User not valid for this operation!"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error});
    }
};
//Ecommerce Post Reports
exports.getAllUserReports = async (req,res) =>{
    // const farmerId = req.params.id;
    // const postId = req.params.pid;
    const uuid = req.user.uuid;
    console.log('inside getAllUserReports');
    try {
        let farmer = await Farmers.findOne({attributes:['id'], where:{uuid}});
        if(!farmer){
            return res.status(404).json("User Not found!");
        }
        const reports = await EcommerceReport.findAll({ where: { farmerId:farmer.id}});
    dbDebugger("getAnimalPostReports db process passed!!");

        return res.json({reports});
    } catch (error) {
        return res.status(500).json({error});
    }
};
exports.reportEcommercePost = async (req,res) =>{
    const postId = req.params.pid;
    const schema = Joi.object( {
        reportDescription: Joi.string().required(),
        reportType: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const {reportDescription,reportType} = req.body;
    try {
        let post = await Posts.findOne({attributes:['id'],where:{uuid:postId}});
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid:req.user.uuid}});
        (!farmer) && (!post) && (res.status(404).json({error:"User Not Found!"}));
        const report = await EcommerceReport.create({postId:post.id,farmerId:farmer.id,reportDescription,reportType});
    dbDebugger("addAnimalPostReport db process passed!!");
        return res.json({report});
    } catch (error) {
        return res.status(500).json({error});
    }
}