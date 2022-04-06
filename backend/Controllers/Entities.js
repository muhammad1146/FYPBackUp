const Joi = require('joi');
const {Farmers,Experts,FarmerReports,ExpertReports,EcommerceReport,QuestionReport,
    AnswerReports,BlogReport,QuestionComments,QuestionReacts,QuestionImages,Questions,
    Answers,AnswerImages,AnswerReacts,Posts,PostComments,PostImages,PostReacts,AnimalPostOrders,
Blogs,BlogComments,BlogImages,BlogReacts,BlogTags,QuestionTags} = require('../models');
// Farmers
exports.changeFarmerStatus = async(req,res) => {
    const fid = req.params.id;
    const schema = Joi.object( {
        activeStatus:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
   
        const {activeStatus } =req.body;
        try {
            const farmer = await Farmers.update({activeStatus},{where:{uuid:fid}});
            return res.json({farmer});
        } catch (error) {
            return res.status(500).json({error});
        }
    }; 
//Farmer Reports
exports.getReportedFarmers = async(req,res) => {
    const reportStatus = "unSeen";
     try {
         const AllfarmerReports = await FarmerReports.findAll({where:{reportStatus}});
         return res.json({AllfarmerReports});
     } catch (error) {
         return res.status(500).json({error});
     }
     
 };

exports.getFarmerReports = async(req,res) => { //get All reports reported about a farmer
   const uuid = req.params.fid; 
    try {
        let farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        (!farmer) && (res.status(404).json({error:"User Not Found!"}));

        const reports = await FarmerReports.findAll({where:{farmerId:farmer.id}});
        return res.json({reports});
    } catch (error) {
        return res.status(500).json({error});
    }
    
};

exports.getFarmerReport = async(req,res) => { //get One Report
    const id = req.params.frid;
     try {
         const report = await FarmerReports.findOne({where:{id}});
         return res.json({report});
     } catch (error) {
         return res.status(500).json({error});
     }
     
 };

exports.respondToFarmerReport = async(req,res) => {
    const id = req.params.frid;
    const reportStatus = "seen";
     try {
         const response = await FarmerReports.update({reportStatus},{where:{id}});
         return res.json({response});
     } catch (error) {
         return res.status(500).json({error});
     }
     
 };

//experts
exports.changeExpertStatus = async(req,res) => {
    const uuid = req.params.eid;
    const schema = Joi.object({
        activeStatus:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    const {activeStatus} = req.body;
    try {
        const expert = await Experts.update({activeStatus},{where:{uuid}});
        return res.json({expert});
    } catch (error) {
        return res.status(500).json({error});
    }
    
    }; 
// Expert Reports
exports.getReportedExperts = async(req,res) => {
    const reportStatus = "unSeen";
     try {
         const AllExpertReports = await ExpertReports.findAll({where:{reportStatus}});
         return res.json({AllExpertReports});
     } catch (error) {
         return res.status(500).json({error});
     }
     
 };

 exports.getExpertReports = async(req,res) => {
    const expertId = req.params.eid;
     try {
         const reports = await ExpertReports.findAll({where:{expertId}});
         return res.json(reports);
     } catch (error) {
         return res.status(500).json(error);
     }
     
 };
 
exports.getExpertReport = async(req,res) => {
     const id = req.params.erid;
      try {
          const report = await FarmerReports.findOne({where:{id}});
          return res.json(report);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };
 
exports.respondToExpertReport = async(req,res) => {
     const id = req.params.erid;
     const reportStatus = "seen";
      try {
          const response = await ExpertReports.update({reportStatus},{where:{id}});
          return res.json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };
 
// Questions
exports.deleteQuestion = (req,res) =>{
    const id = req.params.qid;
    try {
        const answers = Answers.destroy({where:{question:id}});
        const reacts = QuestionReacts.destroy({where:{questionId:id}});
        const comments = QuestionComments.destroy({where:{questionId:id}});
        const tags = QuestionTags.destroy({where:{questionId:id}});
        const images = QuestionImages.destroy({where:{questionId:id}});
        const reports = QuestionReport.destroy({where:{questionId:id}});
        const question = Questions.destroy({where:{id}});
        return res.json({question,answers,reacts,comments,images,tags,reports}); 
    } catch (error) {
        return res.status(500).json(error);
    }
}; 

exports.getReportedQuestions = async(req,res) => {
    const reportStatus = "unseen";
     try {
         const AllReports = await QuestionReport.findAll({where:{reportStatus}});
         return res.json(AllReports);
     } catch (error) {
         return res.status(500).json(error);
     }
     
 };

exports.getQuestionReports = async(req,res) => 
{
const questionId = req.params.qid;
    try 
    {
        const reports = await QuestionReport.findAll({where:{questionId}});
        return res.json(reports);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};
 
exports.getQuestionReport = async(req,res) => {
     const id = req.params.qrid;
      try {
          const report = await QuestionReport.findOne({where:{id}});
          return res.json(report);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };
 
exports.respondToQuestionReport = async(req,res) => {
     const id = req.params.qrid;
     const reportStatus = "seen";
      try {
          const response = await QuestionReport.update({reportStatus},{where:{id}});
          return res.json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };
//Answers
exports.deleteAnswer = async (req,res) =>{
    const id = req.params.aid;
    try {
        const reports = await AnswerReports.destroy({where:{answerId:id}});
        const reacts =await AnswerReacts.destroy({where:{answerId:id}});
        const images =await AnswerImages.destroy({where:{answerId:id}});
        const answer = await Answers.destroy({where:{id}});
        return res.json({answer,reports,reacts,images}); 
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Answer Reports

exports.getReportedAnswers = async(req,res) => {
    const reportStatus = "unseen";
     try {
         const AllReports = await AnswerReports.findAll({where:{reportStatus}});
         return res.json(AllReports);
     } catch (error) {
         return res.status(500).json(error);
     }
     
 };

exports.getAnswerReports = async(req,res) => 
{
const answerId = req.params.aid;
    try 
    {
        const reports = await AnswerReports.findAll({where:{answerId}});
        return res.json(reports);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};
 
exports.getAnswerReport = async(req,res) => 
{
    const id = req.params.arid;
    try 
    {
        const report = await AnswerReports.findOne({where:{id}});
        return res.json(report);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};
 
exports.respondToAnswerReport = async(req,res) => {
     const id = req.params.arid;
     const reportStatus = "seen";
      try {
          const response = await AnswerReports.update({reportStatus},{where:{id}});
          return res.json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };


//Ecommerce 

exports.deletePost = async (req,res,next)=>{
// For Deleting Post 
const id = req.params.pid
try {
const comments = await PostComments.destroy({where:{postId:id}});
const images = await PostImages.destroy({where:{postId:id}});
const reacts = await PostReacts.destroy({where:{postId:id}});
const orders = await AnimalPostOrders.destroy({where:{postId:id}});
const post = await Posts.destroy({where:{id}});
return res.json(post,comments,images,reacts,orders);
} catch (error) {
    return res.status(500).json(error);
} 
};

//Ecommerce Posts

exports.getReportedPosts = async(req,res) => {
const reportStatus = "unseen";
    try {
        const AllReports = await EcommerceReport.findAll({where:{reportStatus}});
        return res.json(AllReports);
    } catch (error) {
        return res.status(500).json(error);
    }
    
};

exports.getPostReports = async(req,res) => 
{
const postId = req.params.pid;
    try 
    {
        const reports = await EcommerceReport.findAll({where:{postId}});
        return res.json(reports);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};
 
exports.getPostReport = async(req,res) => 
{
    const id = req.params.prid;
    try 
    {
        const report = await EcommerceReport.findOne({where:{id}});
        return res.json(report);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
};
 
exports.respondToPostReport = async(req,res) => 
{
    const id = req.params.prid;
    const reportStatus = "seen";
    try 
    {
        const response = await EcommerceReport.update({reportStatus},{where:{id}});
        return res.json(response);
    } catch (error) 
    {
        return res.status(500).json(error);
    }
    
}; 

//Blogs

exports.deleteBlog = async(req,res,next) =>{
    const blogId = req.params.bid;
    try {
        const tags = await BlogTags.destroy({where:{blogId}});
        const images =await BlogImages.destroy({where:{blogId}});
        const reacts =await BlogReacts.destroy({where:{blogId}});
        const comments =await BlogComments.destroy({where:{blogId}});
        const reports =await BlogReport.destroy({where:{blogId}});
        const blog =await Blogs.destroy({where:{id}});
        return res.json(blog,tags,images,reacts,comments,reports); 
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getReportedBlogs = async(req,res) => {
    const reportStatus = "unseen";
     try {
         const AllReports = await BlogReport.findAll({where:{reportStatus}});
         return res.json(AllReports);
     } catch (error) {
         return res.status(500).json(error);
     }
     
 };

 exports.getBlogReports = async(req,res) => {
    const blogd = req.params.bid;
     try {
         const reports = await BlogReport.findAll({where:{blogId}});
         return res.json(reports);
     } catch (error) {
         return res.status(500).json(error);
     }
     
 };
 
exports.getBlogReport = async(req,res) => {
     const id = req.params.brid;
      try {
          const report = await BlogReport.findOne({where:{id}});
          return res.json(report);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  };
 
exports.respondToBlogReport = async(req,res) => {
     const id = req.params.prid;
     const reportStatus = "seen";
      try {
          const response = await BlogReport.update({reportStatus},{where:{id}});
          return res.json(response);
      } catch (error) {
          return res.status(500).json(error);
      }
      
  }; 


