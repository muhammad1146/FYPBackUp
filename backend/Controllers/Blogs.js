const {Blogs,BlogTags,BlogReacts,BlogComments,BlogImages,blogReport} = require('../models/blogs');

//Blog
exports.addBlog = (req,res,next) =>{
    const {body,description,title,topic,expertId} = req.body;
    const {blogTags} = req.body;
    try {
        const blog = Blogs.create({body,description,title,topic,expertId});
        const tags = BlogTags.bulkCreate(blogTags,{returning:true});
        return res.json(blog,tags);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getBlogs = (req,res,next) =>{
    try {
        const blogs = Blogs.findAll({include:[BlogTags,BlogReacts]});
        return res.json(blogs);
    } catch (error) {
        return res.status(500).json(error);

    }
};
/* .... We need to query DB for Blogs with different topics */

exports.getBlog = (req,res,next) =>{
    const id = req.params.bid;
    try {
        const blog = Blogs.findOne({where:{id}},{include:[BlogTags,BlogReacts,BlogComments,BlogImages]});
        return res.json(blog);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.editBlog = (req,res,next) =>{
    const id = req.params.bid;
    const {body,description,title,topic} = req.body;
    const {blogTags} = req.body;
    try {
        const updatedblog = Blogs.update({body,description,title,topic},{where:{id}});
        const updatedTags = BlogTags.bulkCreate(blogTags,{ updateOnDuplicate:["TagId"]});
        return res.json(updatedTags,updatedblog);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteBlog = (req,res,next) =>{
    const id = req.params.bid;
    try {
        const deletedBlog = Blogs.destroy({where:{id}});
        return res.json(deletedBlog); 
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogComments 

exports.GetBlogComments = (req,res,next) =>{
   const id = req.params.bid;
   try {
       const blogComments = BlogComments.findAll({where:{blogId:id}});
       return res.json(blogComments);
   } catch (error) {
       return res.status(500).json(error);
   }
};

exports.addBlogComment = (req,res,next) =>{
const blogId = req.params.bid;
const {body,commenterType,commenterId} = req.body;
try {
    const comment = BlogComments.create({body,commenterType,commenterId,blogId });
    return res.json(comment);
} catch (error) {
    return res.status(500).json(error);
}
};
exports.editBlogComments = (req,res,next) =>{
    const id = req.params.bcid;
    const {body,commenterId,commenterType} = req.body;
    try {
        const comment = BlogComments.update({body},{where:{id}})
        return res.json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteBlogcomment = (req,res,next) =>{
    const id = req.params.bcid;
    try {
        const comment = BlogComments.destroy({where:{id}});
        return res.json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogReacts
exports.getBlogReacts = (req,res) => {
const id = req.params.bid;
try {
    const reacts = BlogReacts.findAll();
    return res.json(reacts);
} catch (error) {
    return res.status(500).json(error);
}
};

exports.addBlogReact = (req,res) => {
const blogId = req.params.bid;
const {commitType,commiterId} = req.body;
try {
    const react = BlogReacts.create({commitType,commiterId,blogId});
    return res.json(react);
} catch (error) {
    return res.status(500).json(error);
}
};

exports.editBlogReact = (req,res) => {

    const blogId = req.params.bid;
    const {commitType,commiterId} = req.body;
    try {
        const react = BlogReacts.update({commitType},{where:{blogId,commiterId}});
        return res.json(react);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogTags
exports.addtag = (req,res) => {

 const {tag,description} = req.body;
try { 
    const tag = AllBlogTags.create({tag,description});
    return res.json(tag);
} catch (error) {
    return res.status(500).json(error);
}
}; 
exports.getAllBlogTags = (req,res) => {
try {
    const tags = AllBlogTags.findAll();
    return res.json(tags);
} catch (error) {
    return res.status(500).json(error);
}

}

//blogReports
//addBlogReport
exports.addBlogReport = (req,res) => {
    const currentTime = new Date();
    const blogId = req.params.bid;
    const {reporterId,reportDescription} = req.body;
    try {
        const blog_report = blogReport.create({blogId,reporterId,reportDescription,currentTime});
        return res.json(blog_report);
    } catch (error) {
        return res.status(500).json(error);
    }
    
    };
//deleteBlogReport
exports.deleteBlogReport = (req,res) => {
    const blogReportId = req.params.brid;
    try {
        const blog_report = blogReport.destroy({where:{id:blogReportId}});
        return res.json(blog_report);
    } catch (error) {
        return res.status(500).json(error);
    }
    
    };
//getBlogReports
exports.getBlogReport = (req,res) => {

        const {reporterId} = req.body;
        try {
            const blog_report = blogReport.destroy({where:{reporterId,}});
            return res.json(blog_report);
        } catch (error) {
            return res.status(500).json(error);
        }
        
        };

//getBlogReports        

        