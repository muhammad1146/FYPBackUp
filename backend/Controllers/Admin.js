const {Answers,Experts,Farmers,Questions,Blogs,
    Answers,AnswerReacts,AnswerImages,AnswerReport,BlogComments,
    BlogImages,BlogReacts,BlogTags,QuestionTags,
    QuestionVotes,QuestionReport,QuestionImage,QuestionReacts,
    QuestionComments,PostComments,PostImages,PostReacts,Posts,EcommerceReport,AnimalPostOrders,BlogReport} = require('../models');
     
exports.deleteQuestion = (req,res) => {
        const questionId = req.params.qid;
        try {
            const reacts = QuestionReacts.destroy({where:{questionId}});
            const votes = QuestionVotes.destroy({where:{questionId}});
            const comments = QuestionComments.destroy({where:{questionId}});
            const tags = QuestionTags.destroy({where:{questionId}});
            const images = QuestionImage.destroy({where:{questionId}});
            const answers = Answers.destroy({where:{questionId}});
            const report = QuestionReport.destroy({where:{questionId}})
            const question = Questions.destroy({where:{id}});
            return res.json(question,answers,tags,images,comments,votes,reacts,report);
        } catch (error) {
            return res.status(500).json(error);
        }
};
  

exports.deleteAnswer = (req,res) => {
    const answerId = req.params.aid;
    try {
        const reacts = AnswerReacts.destroy({where:{answerId}});
        const images = AnswerImages.destroy({where:{answerId}});
        const reports = AnswerReports.destroy({where:{answerId}});
        const answer = Answers.destroy({where:{id:answerId}});
        return res.json(answer,reacts,images,reports);
    } catch (error) {
        return res.status(500).json(error);
    }
};
 
exports.respondToAnswerReport = (req,res) => {
    const id = req.params.arid;
    const reportStatus = "seen";

    try {
    const report = AnswerReport.update({reportStatus},{where:{id}});
    return res.json(report);    
    } catch (error) {
        return res.status(500).json(error);
    }

};
exports.deleteBlog = (req,res) => {
    const blogId = req.params.bid;
    try {
        const tags = BlogTags.destroy({where:{blogId}});
        const images = BlogImages.destroy({where:{blogId}});
        const reacts = BlogReacts.destroy({where:{blogId}});
        const comments = BlogComments.destroy({where:{blogId}});
        const blog = Blogs.destroy({where:{id:blogId}});
        return res.json(blog,tags,images,reacts,comments);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.respondToBlogReport = (req,res) => {
    const id = req.params.brid;
    const reportStatus = "seen";

    try {
    const report = BlogReport.update({reportStatus},{where:{id}});
    return res.json(report);    
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.deleteEcommercePost = (req,res) => {
    const postId = req.params.pid;
    try {
        const comments = PostComments.destroy({where:{postId}});
        const images  = PostImages.destroy({where:{postId}});
        const reacts = PostReacts.destroy({where:{postId}});
        const reports = EcommerceReport.destroy({where:{postId}});
        const orders = AnimalPostOrders.destroy({where:{postId}});
        const post = Posts.destroy({where:{id:postId}});
        return res.json(post,reports,images,reacts,comments,orders);
    } catch (error) {
        return res.status(500).json(error);
    }
};


exports.respondToPostReport = (req,res) => {
    const id = req.params.prid;
    const reportStatus = "seen";

    try {
    const report = postReport.update({reportStatus},{where:{id}});
    return res.json(report);    
    } catch (error) {
        return res.status(500).json(error);
    }

};



exports.changeFarmerStatus = (req,res) => { //block/unblock the farmer
const farmerId = req.params.id;
const {ActiveStatus} = req.body;
try {
    const farmer = Farmers.update({ActiveStatus},{where:{farmerId}});
    return res.json(farmer)
} catch (error) {
    return res.status(500).json(error);
}

};

exports.respondToFarmerReport = (req,res) => {
    const id = req.params.frid;
    const reportStatus = "seen";

    try {
    const report = farmerReports.update({reportStatus},{where:{id}});
    return res.json(report);    
    } catch (error) {
        return res.status(500).json(error);
    }

};
//experts
exports.changeExpertStatus = (req,res) => { //block/unblock expert
    const id = req.params.eid;
    const {expertStatus} = req.body;
    try {
        const expert = Experts.update({expertStatus},{where:{id}});
        return res.json(expert);
    } catch (error) {
        return res.status(500).json(error);
    }
};
 
exports.respondToExpertReport = (req,res) => {
    const id = req.params.erid;
    const reportStatus = "seen";

    try {
    const report = expertReports.update({reportStatus},{where:{id}});
    return res.json(report);    
    } catch (error) {
        return res.status(500).json(error);
    }

};
    


