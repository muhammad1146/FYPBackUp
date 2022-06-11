const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config({path:'D:/cattletalk/backend/.env'});
const {Experts,ExpertsRank,ExpertExperience,
    ExpertQualification,ExpertReports} = require('../models');

exports.addExpert =async (req,res) => {
      const schema = Joi.object( {
          name: Joi.string().required(),
          userName: Joi.string().required(),
          phoneNumber: Joi.string().required(),
          password: Joi.string().required(),
          address: Joi.string().required(),
          experties:Joi.array().required()
      });
      try {
          const value = await schema.validateAsync(req.body);
      } catch (error) {
        return res.status(400).send(error.details[0].message);
          
      }
      let {userName,name,password,phoneNumber,experties,address} = req.body;
      
      experties=experties.toString();
     const rankId = 1;
      const test = await Experts.findOne({where:{userName:userName}});
      const test1 = await Experts.findOne({where:{userName:userName}});
     if(test || test1) return res.status(400).send('UserName already exist!!');
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password,salt);
      try 
      {
      const expert =await Experts.create({name,userName,password:hashPassword,phoneNumber,address,experties,rankId});
      return res.json(expert);
      } catch (error) 
      {
          return res.status(500).json(error);
      }
  };

  exports.addExpertExperience = async (req,res) => {
    const schema = Joi.object({
        institute: Joi.string().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        position: Joi.string().required(),   
    });
    try {
        const value = await schema.validateAsync(req.body);   
    } catch (error) {
       return res.status(400).send(error.details[0].message)
               
    }
    const {institute,from,to,position} = req.body;
    const uuid = req.user.uuid;
    try {
        const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
        if(expert.id){
            const experience = await ExpertExperience.create({expertId:expert.id,institute,startDate:from,endDate:to,position});
            return res.json(experience);
        }
        else {
            return res.status(401).send("User is not valid for this action");
        }
    } catch (error) {
        return res.status(400).send(error);
    }
  };

  exports.changePicture = async (req,res) => 
{   
    console.log("updateExpert picture")
    const schema = Joi.object({
        profileImage:Joi.string()
     });

     try 
    {
        const value = await schema.validateAsync(req.body);
    } catch (error) 
    {
        return res.status(400).send(error.details[0].message)
    }
    const expertUUID = req.params.uuid;
    const uuid = req.user.uuid;
    console.log(uuid,expertUUID)
    if(uuid===expertUUID)
    {
        if(!req.file){
           return res.status(500).send("file missing...")
        }
        const profileImage = req.file.filename;    
        console.log(profileImage);   
        try     
        {
            const updatedPicture = await Experts.update({profileImage},{where:{uuid}});
            console.log(updatedPicture,"updatedPicture")
            return res.json(updatedPicture);   
    }
    catch (error)    
    {
        console.log(error)
        return res.status(500).json(error);    
    }
}
else {
    return res.status(401).send("Irrelevent user");
}
};


  exports.getExperiences = async (req,res) => {
    const uuid = req.user.uuid;
    try {
        const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
        const expertId = expert.id;
        const experiences = await ExpertExperience.findAll({where:{expertId}});
        return res.json(experiences);
    } catch (error) {
        return res.status(400).send(error);
    }
    
} 

exports.addExpertRank = async (req,res) => {
    console.log("Reached to the route controller");
    const schema = Joi.object( {
        rankname: Joi.string().required(),
        description: Joi.string().required(),
        adminPassword:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
       return res.status(400).send(error.details[0].message);
    } 
    const {rankname,description,adminPassword} = req.body;
    console.log(typeof(adminPassword));
    console.log(process.env.ADMIN_PASSWORD);

    if(adminPassword===process.env.ADMIN_PASSWORD)
    {
        try {
            const expertRank = await ExpertsRank.create({rankname,description});
            return res.json(expertRank);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    else {
        return res.status(401).send("adminPassword is not valid");
    }
}
exports.editExpertRank = async (req,res) => {
const id = req.params.rankid;
    const schema = Joi.object( {
        rankname: Joi.string().required(),
        description: Joi.string().required(),
        adminPassword:Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
       return res.status(400).send(error.details[0].message);
    } 
    const {rankname,description,adminPassword} = req.body;
    

    if(adminPassword===process.env.ADMIN_PASSWORD)
    {
        try {
            const updatedExpertRank = await ExpertsRank.update({rankname,description},{where:{id}});
            return res.json(updatedExpertRank);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    else {
        return res.status(401).send("adminPassword is not valid");
    }
}
exports.getExpertRanks = async (req,res) => {
    
    try {
        const expertRanks = await ExpertsRank.findAll();
        return res.json(expertRanks);    
    } catch (error) {
        return res.status(400).send(error);
    }
        
    };

exports.getExpertExperience = async (req,res) => {
const uuid = req.params.eeid;

try {
    const experience = await ExpertExperience.findOne({where:{uuid}});
    return res.json(experience);    
} catch (error) {
    return res.status(400).send(error);
}
    
}; 

exports.editExpertExperience = async (req,res) => {
    const schema = Joi.object({
        institute: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        position: Joi.string().required(),   
    });
    try {
        const value = await schema.validateAsync(req.body);   
    } catch (error) {
       return res.status(400).send(error.details[0].message)
               
    }
    const {institute,startDate,endDate,position} = req.body;
    const uuid = req.user.uuid;
    const euuid = req.params.eeid;
   try {
       const expert  = await Experts.findOne({attributes:['id'],where:{uuid}});
       const experience = await ExpertExperience.findOne({attributes:['expertId'],where:{uuid:euuid}});
       if(expert.id === experience.expertId){
           const updatedExperience = await ExpertExperience.update({
               institute,startDate,endDate,position
            },{where:{uuid:euuid}});
            return res.json(updatedExperience);
        }
        else {
            return res.status(401).send("invalid user for this action");
        }
   } catch (error) {
    return res.status(500).send(error);   
   }

    
} 
exports.deleteExpertExperience = async (req,res) => {
const uuid = req.params.eeid;
const expertuuid = req.user.uuid;

    try {
        const expert = await Experts.findOne({attributes:['id'],where:{uuid:expertuuid}});
        const experience = await ExpertExperience.findOne({attributes:['expertId'],where:{uuid}});
        if(expert.id===experience.expertId){
            const deletedExperience = await ExpertExperience.destroy({where:{uuid}});
            return res.json(deletedExperience);
        }
        else{
            return res.status(401).send("User is forbidden for this action");
        }
    } catch (error) {
        return res.status(400).send(error);
    }  
};

exports.getExperts = async(req,res,next) => {
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
        const experts = await Experts.findAndCountAll({attributes:['name','uuid','userName','phoneNumber','address','profileImage','description','rankId','experties'],include:[ExpertsRank],limit:size,offset:size*page});
        return res.json({content:experts.rows,
        totalPages:Math.ceil(experts.count /Number.parseInt(size))
        });
    } catch (error) {
       return res.status(500).json(error); 
    }
};


exports.searchExperts = async(req,res,next) => {
    let pageAsNumber = req.query.page;
    let sizeAsNumber = req.query.size;
    let search = req.query.search;
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && (pageAsNumber>1) && (pageAsNumber<15)){
        page = pageAsNumber;
    }
    let size = 15
    if(!Number.isNaN(sizeAsNumber) && (sizeAsNumber>1) && (sizeAsNumber<15)){
        size = sizeAsNumber;
    }
    try {
        const experts = await Experts.findAndCountAll({attributes:['name','uuid','userName','phoneNumber','address','profileImage','description','rankId','experties'],where:{
            [Op.or]:[
                {name:{[Op.iLike]: '%'+search + '%'}},
                {userName:{[Op.iLike]: '%'+search + '%'}},

            ]
        },include:[ExpertsRank],limit:size,offset:size*page});
        return res.json({content:experts.rows,
        totalPages:Math.ceil(experts.count /Number.parseInt(size))
        });
    } catch (error) {
       return res.status(500).json(error); 
    }
};


exports.getAllExperts = async(req,res,next) => {
    let query = req.query.text;
    console.log('inside getAllExperts')
    try {
        const experts = await Experts.findAll({attributes:['userName'],where:{userName: query}});
        return res.json({experts});
    } catch (error) {
        console.log(error);
       return res.status(500).json(error); 
    }
};

exports.getExpert = async (req,res) => {
    console.log('inside getExpert function')
    const uuid = req.params.uuid;
    try {
        const expert = await Experts.findOne({where: {uuid},include:[ExpertsRank,ExpertExperience,ExpertQualification]});
        console.log(expert)
        return res.json(expert);
    } catch (error) {
       return res.status(500).json(error); 
    }
};

exports.editExpert  = async (req,res) => {
    const expertId = req.params.eid;
    const uuid = req.user.uuid;
    const schema = Joi.object({
        name:Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        isAdmin: Joi.boolean(),
        profileImage: Joi.string(),
        description: Joi.string(),
        experties: Joi.string(),   
    });
    try {
        const value = await schema.validateAsync(req.body); 
    } catch (error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const {name,phoneNumber,address,description} = req.body;
    
      try {
        if(uuid===expertId)
        {
            const expert = await Experts.update({name,phoneNumber,address,
                description,},{where:{uuid:expertId}});
                return res.json({expert});         
            }
            else{
                return res.status(401).send("invalid user for this action");
            }
            } catch (error) {
                return res.status(500).json(error); 
            }
};



exports.addExpertReport = async (req,res) => {
    const date = new Date();
    const expertId = req.params.eid; 
    const schema = Joi.object({
        reportDescription: Joi.string().required(),
        reportType: Joi.string().required(),
        reporteeType: Joi.string().required(),
        reporteeId: Joi.string().required(),
       
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const {reportDescription,reportType,reporteeType,reporteeId} = req.body;
    try {
        const report = await ExpertReports.create({expertId,reporteeType,reporteeId,reportDescription,reportType,date});
        return res.json(report);
    } catch (error) {
       return res.status(500).json(error); 
    }
};
exports.getAllReports = async (req,res) => {
    const expertId = req.params.erid;
    try {
        const reports = await ExpertReports.findAll({where:{expertId}});
        return res.json(reports)
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteExpertReport = async (req,res) => {
    const id = req.params.erid;
    try {
        const report = await ExpertReports.destroy({where:{id}});
        return res.json(report)
    } catch (error) {
        return res.status(500).json(error);
    }
}; 
exports.expertLogin = async (req,res) => {
    const schema = Joi.object( {
        userName: Joi.string().required(),
        password: Joi.string().min(5).required()
    });
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
       return res.status(400).send(error.details[0].message);
    }
    console.log('expert login reached');
    const {userName,password} = req.body;
 
     try {
        const expert = await Experts.findOne({where:{userName}});
        if(!expert) return res.status(400).send('User not found!');
        const validPass = await bcrypt.compare(password,expert.password);
        if(!validPass) return res.status(401).json({error:'Password/username is not correct!'});
        const expertType = (expert.isAdmin) ? "A" : "E";
        // if(!(expertType===type)) return res.status(401).send("user type is not valid for these credentials");
        const token = jwt.sign({uuid:expert.uuid,type:'E'},"secret",{
            expiresIn:'300s'
        });
        const refreshToken = jwt.sign({uuid:expert.uuid,type:'E'},"refreshSecret",{
            expiresIn:'365d'
        });
        res.cookie("refreshToken",refreshToken,{
            maxAge:300000000
        })
        res.cookie("accessToken",token,{
            maxAge:300000
        })
        res.status(200).send({accessToken:token,refreshToken});
        return;
        } catch (err) {
         return res.status(500).json({err});
     }

};


exports.addExpertQualification = async (req,res) => {
    const schema = Joi.object({
        institute: Joi.string().required(),
        percentage: Joi.number().required(),
        qualification: Joi.string().required(),
        duration: Joi.number().required(),   
    });
    try {
        const value = await schema.validateAsync(req.body);   
    } catch (error) {
       return res.status(400).send(error.details[0].message)
               
    }
    const {institute,percentage,qualification,duration} = req.body;
    const uuid = req.user.uuid;
    try {
        const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
        if(expert.id){
            const experience = await ExpertQualification.create({expertId:expert.id,institute,qualification,percentage,duration});
            return res.json(experience);
        }
        else {
            return res.status(401).send("User is not valid for this action");
        }
    } catch (error) {
        return res.status(400).send(error);
    }
  };

  exports.deleteExpertQualification = async (req,res) => {
    const id = req.params.id;
    const uuid = req.user.uuid;
    
        try {
            const expert = await Experts.findOne({attributes:['id'],where:{uuid}});
            const qualification = await ExpertQualification.findOne({attributes:['expertId'],where:{id}});
            if(expert.id===qualification.expertId){
                const deletedQualification = await ExpertQualification.destroy({where:{uuid}});
                return res.json(deletedQualification);
            }
            else{
                return res.status(401).send("User is forbidden for this action");
            }
        } catch (error) {
            return res.status(400).send(error);
        }  
    };