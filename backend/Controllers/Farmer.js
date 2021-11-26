const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Farmers,Experts, Farms,FarmersExperience,FarmerReports,FarmersRank} = require('../models');
exports.addFarmer = async (req,res) => 
{
    const schema = Joi.object({
        name: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string(),
        address: Joi.string(),
        farmingType: Joi.string(),
        description: Joi.string(),
        profileImage: Joi.string(),
         });
    try { 
        const value = await schema.validateAsync(req.body);
    } catch (error) {
    return res.status(400).send(error.details[0].message)
    }
    const rankId = 1;
      const {name,phoneNumber,address,userName,farmingType,
          description,profileImage,password} = req.body;
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     try {
         const expert = await Experts.findOne({attributes:['id'],where:{userName}});
         const farmer = await Farmers.findOne({attributes:['id'],where:{userName}});
         console.log(farmer);
         if(farmer || expert) return res.status(501).send("Username already exist,try someting else");
         const newfarmer = await Farmers.create({
              name,phoneNumber,address,password:hashedPassword,userName,farmingType,rankId,description,profileImage
            });

         return res.json(newfarmer);
     } catch (error) {
         return res.status(500).send(error);
         
     }
};

exports.addFarm = async (req,res) => {
    
    const schema = Joi.object({
        farmName: Joi.string().required(),
        farmSize: Joi.number().required(),
        numberOfCattle: Joi.number().required(),
        startDate: Joi.string().required(),
        farmLocation: Joi.string().required(),
        images: Joi.string(),
        farmingType: Joi.string().required()
         });
    try { 
        const value = await schema.validateAsync(req.body);
    } catch (error) {
    return res.status(400).send(error.details[0].message)
    }
    const uuid = req.user.uuid;
    const {farmName,farmLocation,farmSize,numberOfCattle,startDate,images,farmingType} = req.body;
    try {
        const farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        const farmerId = farmer.id;
        const farm = await Farms.create({farmerId,farmName,farmLocation,farmSize,numberOfCattle,startDate,images,farmingType});
        return res.json(farm);
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.getFarms = async (req,res) => {    
    console.log('getFarms');
     const uuid = req.user.uuid;
     try {
         const farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
         const farmerId = farmer.id;
          const farms = await Farms.findAll({attributes:['uuid','farmName','farmLocation'], where:{farmerId}});
         return res.json(farms);
     } catch (error) {
         console.log(error);
         return res.status(400).json(error);
     }
};

exports.getFarm = async (req,res) => {    
    const uuid = req.params.farmid;
    console.log('inside getFarm');
    try {
            const farm = await Farms.findAll({where:{uuid},attributes:{exclude:['farmerId']}});
       return res.json(farm);
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.editFarm = async (req,res) => {  
    const user = req.user;  
    const schema = Joi.object({
        farmName: Joi.string().required(),
        farmSize: Joi.number().required(),
        numberOfCattle: Joi.number().required(),
        farmLocation: Joi.string().required(),
        images: Joi.string(),
        farmingType: Joi.string().required()
         });
    try {
        
        const value = await schema.validateAsync(req.body);
    } catch (error) {
    return res.status(400).send(error.details[0].message)
    }
    const {farmingType,farmName,farmLocation,numberOfCattle,images} = req.body;
    
    const uuid = req.params.farmid;
    const farmerId = await Farms.findOne({attributes:['farmerId'],where:{uuid}});
    const farmer = await Farmers.findOne({attributes:['id'],where:{uuid:user.uuid}});
    if(farmerId.farmerId===farmer.id && user.userType==="F")
    {
    try {
            const updatedfarm = await Farms.update({farmingType,farmName,farmLocation,numberOfCattle,images},{where:{uuid}});
        return res.json(updatedfarm);
    } catch (error) {
        return res.status(400).json(error);
    }
    }
    else{
        return res.status(401).send("The user is not Relevent");
    }
};
exports.deleteFarm = async (req,res) => {    
    const user = req.user;
    const uuid = req.params.farmid;
        const farmerId = await Farms.findOne({attributes:['farmerId'],where:{uuid}});
        const farmer = await Farmers.findOne({attributes:['id'],where:{uuid:user.uuid}});
        if(farmerId.farmerId===farmer.id && user.userType==="F")
        {
            try {
                const deletedfarm = await Farms.destroy({where:{uuid}});
                return res.json(deletedfarm);
            } catch (error) {
                return res.status(400).json(error);
            }
        }
        else {
            return res.status(401).send("Request is not from a relevent user");
        }
};


exports.getFarmer = async (req,res) => 
{
    const uuid = req.params.id;
    try 
    {
        const farmer = await Farmers.findOne( {attributes:{exclude:['password']}},{where:{uuid},include:[FarmersRank,Farms,FarmersExperience]});
        return res.json(farmer);
    } catch (error) 
    {
        return res.status(500).json(error); 
    } 
};

exports.getFarmers = async (req,res,) => 
{
        try {
            const farmers = await Farmers.findAll({attributes:{exclude:['password']}});
            return res.json(farmers);
            
        } catch (error) {
            return res.status(500).json(error);
        }
};

exports.updateFarmer = async (req,res) => 
{   
    const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
    farmingType: Joi.string(),
    rankId: Joi.number().required(),
    description: Joi.string(),
    profileImage: Joi.string(),
     });
try { 
    const value = await schema.validateAsync(req.body);
} catch (error) {
return res.status(400).send(error.details[0].message)
}
    const farmerUUID = req.params.id;
    const uuid = req.user.uuid;
    if(uuid===farmerUUID)
    {
        const {name,address,phoneNumber,description,rankId,farmingType,profileImage} = req.body;       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);  
        try     
        {
            const updatedFarmer = await Farmers.update({name,address,phoneNumber,description,rankId,farmingType,profileImage},{where:{uuid}});
            return res.json(updatedFarmer);   
    }
    catch (error)    
    {
        return res.status(500).json(error);    
    }
}
else {
    return res.status(401).send("Irrelevent user");
}
};

exports.addReportForFarmer = async (req,res) => 
{
        const date = new Date();
        const schema =Joi.object( {
            reporteeType: Joi.string().required(),
            reporteeId: Joi.string().required(),
            reportType: Joi.string().required(),
            reportDescription: Joi.string().required(),
        });
        try {   
            const value = await schema.validateAsync(req.body);
        } catch (error) {
          return  res.status(400).send(error.details[0].message)
        }
    const uuid = req.params.uuid;
    try {
        const farmer = await Farmers.findOne({attributes:['id']},{where:{uuid}});
        const farmerId = farmer.id;
        const {reporteeType,reporteeId,reportType,reportDescription} = req.body;
        const report = await FarmerReports.create(farmerId,reporteeType,reporteeId,reportType,reportDescription,date);
        return res.json(report);
    
    } catch (error) 
    {
        return res.status(500).json(error);
    } 
};    

exports.getAllReportsForFarmers = async (req,res) =>  //get all reports reporting farmers
{
    const uuid = req.user.uuid;
    const reporterType = "F";
    try 
    {
        const farmer = await Farmers.findOne({attributes:['id']},{where:{uuid}});
        const farmerId = farmer.id;
        const reports = await FarmerReports.findAll({where:{reporterId,reporterType}});
        return res.json(reports);
    } catch (error) 
    {
        return res.status(500).json(error);
    } 
};   

exports.deleteAReportForFarmers = async (req,res) => // delete a report reporting a farmer
{
    const id = req.params.frid;
    try {
        const report = await FarmerReports.destroy({where:{id}});
        return res.json(report);
    } catch (error) {
        return res.status(500).json(error);  
    } 
};   

exports.getRanks = async (req,res) => 
{
    try {
        const ranks = await FarmersRank.findAll();
        return res.json(ranks);
    } catch (error) {
        return res.status(500).json(error);  
    } 
}; 

exports.addRank = async (req,res) => 
{
    const schema = Joi.object(
        {
            rankname: Joi.string().required(),
            description: Joi.string().required()
        }
    );
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const {rankname,description} = req.body;
    try {
        const rank = await FarmersRank.create({rankname,description});
        return res.json(rank);
    } catch (error) {
        return res.status(500).json(error);  
    } 
};  

exports.farmerLogin = async (req,res) => 
{
    const schema = Joi.object(
        {
            userName: Joi.string().required(),
            password: Joi.string().min(4).max(10).required()
        }
    );
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const {userName,password} = req.body;
    try {
        const farmer = await Farmers.findOne({where:{userName}});   
        if(!farmer) return res.status(400).send('Farmer not found');
        const validPass = await bcrypt.compare(password,farmer.password);
        
        if(!validPass) return res.status(400).send('Invalid Password');
        const token = jwt.sign({uuid:farmer.uuid,userType:'F'},"secret");
        res.header('auth-token',token).send(token);
        } catch (error) {
        return res.status(500).json(error);
    } 
};  

exports.addExperience = async (req,res) => 
{
    const uuid = req.user.uuid;
    const schema = Joi.object(
        {
            farmingType: Joi.string().required(),
            position: Joi.string().required(),
            from : Joi.string().required(),
            to: Joi.string().required() 
        }
    );
    try {
        const value = await schema.validateAsync(req.body);
    } catch (error) {
      return  res.status(400).send(error.details[0].message);
    }
    const {farmingType,position,from,to} = req.body;
    try {
        const farmer = await Farmers.findOne({attributes:['id']},{where:{uuid}});
        const farmerId = farmer.id;
        const experience = await FarmersExperience.create({farmingType,position,from,to,farmerId});
        return res.json(experience);
    } catch (error) {
        return res.status(500).json(error);
    } 
}; 

exports.getExperiences = async (req,res) => 
{
    const uuid = req.user.uuid;
        try {
        const farmer = await Farmers.findOne ({attributes:['id'],where:{uuid}});
         const farmerId = farmer.id;
         const experiences = await FarmersExperience.findAll({where:{farmerId}});
         return res.json(experiences);
     } catch (error) {
         return res.status(500).json(error);
    
     } 
}; 

exports.getExperience = async (req,res) => 
{
    const uuid = req.params.exid;
    try {

        const experience = await FarmersExperience.findOne({uuid});
        return res.json(experience);
    } catch (error) {
        return res.status(500).json(error);
    
    } 
}; 

exports.deleteExperience = async (req,res) => 
{
    const uuid = req.params.exid
    if(uuid===req.user.uuid)
    {

        try {
            const deletedExperience = await FarmersExperience.destroy({where:{uuid}});
            return res.json(deletedExperience);
        } catch (error) {
            return res.status(500).json(error);
            
        } 
    }else {
        return res.status(401).send("Unautorized user");
    }
}; 
