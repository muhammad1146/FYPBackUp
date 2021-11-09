const Joi = require('joi');
require('dotenv').config()
const {Experts,Blogs,BlogTags,BlogReacts,BlogComments,BlogImages,BlogReport,BlogTagBox} = require('../models');
//Blog 
exports.addBlog = async (req,res) =>{
    const schema = Joi.object( {
        body: Joi.string().required(),
        description:Joi.string().required(),
        title:Joi.string().required(),
        topic: Joi.string().required(),
        tags:Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).send(error.detail[0].message);      
    }   
        const {body,description,title,topic,tags} = req.body;
        let blogImagePositions = [...body.matchAll(new RegExp('IMAGE','gi'))].map(a => a.index);
        const blogTags = [];
        const uuid = req.user.uuid;
        try {
            const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
            const expertId = expert.id;
            const blog = await Blogs.create({body,description,title,topic,expertId});
            for(let i=0; i<3; i++){
                const object = {
                    blogId:blog.id,
                    TagId:tags[i]
                }
                blogTags.push(object);
            }
            const bTags = await BlogTags.bulkCreate(blogTags,{returning:true});
            return res.json(blog,bTags);
        } 
        catch (error) {
            return res.status(500).json(error);
        }
    
};

exports.getBlogs = async (req,res) =>{
    
    try {
        const blogs = await Blogs.findAll();
        return res.json(blogs);
    } catch (error) {
        return res.status(500).json(error);

    }
};

exports.getExpertBlogs = async (req,res) =>{
    const uuid = req.user.uuid;
    try {
    const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
    if(expert.id){
        const expertId = expert.id;
        const blogs = await Blogs.findAll({where:{expertId}});
        return res.json(blogs);
    }
    else{
        return res.status(401).send("Invalid Request");
    }
    } catch (error) {
        return res.status(500).json(error);

    }
};
exports.getExpertBlog = async (req,res) =>{
    const uuid = req.params.bid;
    try {    
        const blog = await Blogs.findAll({where:{uuid}});
        return res.json(blog);
    } catch (error) {
        return res.status(500).json(error);

    }
};
/* .... We need to query DB for Blogs with different topics */

exports.getBlog = async (req,res) =>{
    
    const id = req.params.bid;
   
    try {
        const blog = await Blogs.findOne({where:{id}},{include:[BlogTags,BlogReacts,BlogComments,BlogImages]});
        return res.json(blog);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.editBlog = async (req,res) =>{
    const id = req.params.bid;
    const schema = Joi.object( {
        body: Joi.string().required(),
        description:Joi.string().required(),
        title:Joi.string().required(),
        topic: Joi.string().required(),
        tags:Joi.array().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.detail[0].message)
        return;
        
    }
    
        const {body,description,title,topic,tags} = req.body;
        const blogTags = [];
        for(let i=0; i<tags.length; i++){
            const obj = {
                blogId: id,
                TagId: tags[i]
                
            }
            blogTags.push(obj);
        }
        try {
            const blog = Blogs.update({body,description,title,topic},{where:{id}});
            const Tags = BlogTags.bulkCreate(blogTags,{ updateOnDuplicate:["TagId"]});
            return res.json(Tags,blog);
        } catch (error) {
            return res.status(500).json(error);
        }
    
};


exports.deleteBlog = async (req,res) =>{
    const blogId = req.params.bid;
    try {
        const tags = await BlogTags.destroy({where:{blogId}});
        const images = await BlogImages.destroy({where:{blogId}});
        const reacts = await BlogReacts.destroy({where:{blogId}});
        const comments = await BlogComments.destroy({where:{blogId}});
        const reports = await BlogReport.destroy({where:{blogId}});
        const blog = await Blogs.destroy({where:{id}});
        return res.json(blog,tags,images,reacts,comments,reports); 
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogComments 

exports.getBlogComments = async(req,res) =>{
   const id = req.params.bid;
   try {
       const blogComments = await BlogComments.findAll({where:{blogId:id}});
       return res.json(blogComments);
   } catch (error) {
       return res.status(500).json(error);
   }
}; 

exports.addBlogComment = async(req,res) =>{
const blogId = req.params.bid;
const schema = Joi.object( {
    body:Joi.string().required(),
    commenterType:Joi.string().required(),
    commenterId:Joi.string().required()
});
try {
    const value = await schema.validateAsync(req.body);
    
} catch (error) {
    res.status(400).send(error.details[0].message);
    return;
    
}


    const {body,commenterType,commenterId} = req.body;
    try {
        const comment = await BlogComments.create({body,commenterType,commenterId,blogId });
        return res.json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }

};
exports.editBlogComment = async (req,res,next) =>
{
    const id = req.params.bcid;
    const schema = Joi.object( {
        body:Joi.string().required(),
    });
    try {
        const value = await schema.validateAsync(req.body);
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
        
    }
    

        try {
            const comment = await BlogComments.update({body},{where:{id}})
            return res.json(comment);
        } catch (error) {
            return res.status(500).json(error);
        }
    
};
exports.deleteBlogComment = async (req,res,next) =>{
    const id = req.params.bcid;
    try {
        const comment = await BlogComments.destroy({where:{id}});
        return res.json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogReacts
exports.getBlogReacts = async (req,res) => {
const blogId = req.params.bid;
try {
    const reacts = await BlogReacts.findAll({where:{blogId}});
    return res.json(reacts);
} catch (error) {
    return res.status(500).json(error);
}
};

exports.addBlogReact = async (req,res) => {
const blogId = req.params.bid;
const schema = Joi.object( {
    commitType:Joi.string().required(),
    commiterId:Joi.string().required(),
    commiterType:Joi.string().required()
});
try {
    const value = await schema.validateAsync(req.body);
    
} catch (error) {
    
    res.status(400).send(error.details[0].message);
    return;
}

    try {
        const react = await BlogReacts.create({commitType,commiterId,commiterType,blogId});
        return res.json(react);
    } catch (error) {
        return res.status(500).json(error);
    }

};

exports.editBlogReact = async (req,res) => {

    const blogId = req.params.bid;
    const schema = Joi.object( {
        commitType:Joi.string().required(),
        commiterId:Joi.string().required(),

    });
    try {
        
    } catch (error) {
        res.status(400).send(error.details[0].message);
    return;
    }
    const {commitType,commiterId} = req.body;
    try {
        const react = await BlogReacts.update({commitType},{where:{blogId,commiterId}});
        return res.json(react);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//blogTags
exports.addBlogTag = async (req,res) => {
const schema = Joi.object({
    tag: Joi.string().required(),
    description: Joi.string().required()
})
try {
    const value =  await schema.validateAsync(req.body);
}
catch (error) {

    res.status(400).send(error.details[0].message);
    return;
 }
const uuid = req.user.uuid;

 const {tag,description} = req.body;
 try { 
    const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
    const expertId = expert.id;
    const newTag = await BlogTagBox.create({tag,description,expertId});
        return res.json(newTag);
    } catch (error) {
        return res.status(500).json(error);
    }
}; 
exports.getAllBlogTags = async (req,res) => {
    try {
    const tags = await BlogTagBox.findAll({attributes:['id','tag']});
    return res.json(tags);
} catch (error) {
    return res.status(500).json(error);
}

}

//blogReports
//addBlogReport
exports.addBlogReport = async (req,res) => {
    const date = new Date();
    const blogId = req.params.bid;
    const schema = Joi.object( {
        reporterId:Joi.string().required(),
        reportType:Joi.string().required(),
        reportDescription: Joi.string().required(),
        reporterType:Joi.string().required()
    });
    try {
        const value =  Joi.validateAsync(req.body);
        
    } catch (error) {
        
        res.status(400).send(error.details[0].message);
        return;
    }

        try {
            const report =await BlogReport.create({blogId,reporterId,reportDescription,date,reportType,reporterType});
            return res.json(report);
        } catch (error) {
            return res.status(500).json(error);
        }
    
    
    };
//deleteBlogReport
exports.deleteBlogReport = async (req,res) => {
    const id = req.params.brid;
    try {
        const report = await BlogReport.destroy({where:{id}});
        return res.json(report);
    } catch (error) {
        return res.status(500).json(error);
    }
    
    };
//getBlogReports
exports.getBlogReports = (req,res) => {
        const blogId = req.params.bid;
        const {reporterId} = req.body;
        try {
            const report = BlogReport.destroy({where:{reporterId}});
            return res.json(report);
        } catch (error) {
            return res.status(500).json(error);
        }
        
        };

//getBlogReports        

        