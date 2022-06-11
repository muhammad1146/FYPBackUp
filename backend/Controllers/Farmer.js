const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');
const {Farmers,Experts, Farms,FarmersExperience,FarmerReports,FarmersRank} = require('../models');
exports.addFarmer = async (req,res) => 
{ 
    const schema = Joi.object({
        name: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string(),
        farmingType: Joi.string().required(),
        description: Joi.string(),
        profileImage: Joi.string(),
         });
    try { 
        const value = await schema.validateAsync(req.body);
    } catch (error) {
    return res.status(400).send(error.details[0].message)
    }
    const rankId = 1;
    const profileImage = req.file?.filename;
      const {name,phoneNumber,address,userName,farmingType,
          description,password,city} = req.body;
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     try {
         const expert = await Experts.findOne({attributes:['id'],where:{userName}});
         const farmer = await Farmers.findOne({attributes:['id'],where:{userName}});
         if(farmer || expert) return res.status(501).send("Username already exist,try someting else");
         const newfarmer = await Farmers.create({
              name,phoneNumber,address,password:hashedPassword,userName,farmingType,rankId,description,profileImage,city
            });

         return res.json(newfarmer);
     } catch (error) {
         console.log(error)
         return res.status(500).send(error);
         
     }
};

exports.addFarm = async (req,res) => {
    let farmerUUID = req.params.uuid;
    const schema = Joi.object({
        farmName: Joi.string().required(),
        farmSize: Joi.number().required(),
        numberOfCattle: Joi.number().required(),
        farmLocation: Joi.string().required(),
      
        farmingType: Joi.string().required()
         });
    try { 
        const value = await schema.validateAsync(req.body);
    } catch (error) {
    return res.status(400).send(error.details[0].message)
    }
    const uuid = req.user.uuid;
    
   
    const {farmName,farmLocation,farmSize,numberOfCattle,farmingType} = req.body;
    const startDate = new Date();
    try {
        const farmer = await Farmers.findOne({attributes:['id'],where:{uuid:farmerUUID}});
        const FARMER = await Farmers.findOne({attributes:['id'],where:{uuid}});
        let farmerId = 0;
        if(farmer.id===FARMER.id){
             farmerId = farmer.id;
        }else{
            return res.status(502).json({error:"Not valid for this request!"});
        }
        const farm = await Farms.create({farmerId,farmName,farmLocation,farmSize,numberOfCattle,startDate,farmingType});
        return res.json(farm);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:error});
    }
};


exports.getFarms = async (req,res) => {    
    const userName = req.params.username;
     const uuid = req.user.uuid;
     try {
         const farmer = await Farmers.findOne({attributes:['id'],where:{userName}});
         const farmerId = farmer.id;
          const farms = await Farms.findAll({where:{farmerId}});
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
        farmImages: Joi.array(),
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
        console.log(farmerId,farmer);
        if(farmerId.farmerId===farmer.id && user.type==="F")
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
{    const uuid = req.params.uuid;
    console.log('reached getFarmer endpoint')
    try 
    {
        const farmer = await Farmers.findOne( {attributes:{exclude:['password']},where:{uuid},include:[FarmersRank,Farms,FarmersExperience]});
        return res.json(farmer);
    } catch (error) 
    {
        return res.status(500).json(error); 
    } 
};

exports.getFarmers = async (req,res,) => 
{
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
            const farmers = await Farmers.findAndCountAll({attributes:{exclude:['password']},include:[FarmersRank],limit:size,offset:page*size}); 
            return res.json({
            content:farmers.rows,
            totalPages:Math.ceil(farmers.count / Number.parseInt(size))
        });
            
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
};

exports.getAllFarmers = async (req,res) => 
{
    console.log('inside getAllFarmers')
    let query = req.query.text;
        try {
            const farmers = await Farmers.findAll({attributes:['userName'],where:{userName:query }}); 
            return res.json({
            farmers
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
};

exports.updateFarmer = async (req,res) => 
{   
    console.log("updateFarmer fn")

    const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
    farmingType: Joi.string(),
    description: Joi.string(),
     });
try { 
    const value = await schema.validateAsync(req.body);
} catch (error) {
return res.status(400).send(error.details[0].message)
}
    const farmerUUID = req.params.uuid;
    const uuid = req.user.uuid;
    if(uuid===farmerUUID)
    {
        const {name,address,phoneNumber,description,farmingType,profileImage} = req.body;       
        try     
        {
            const updatedFarmer = await Farmers.update({name,address,phoneNumber,description,farmingType,profileImage},{where:{uuid}});
            console.log(updatedFarmer,"updatedFarmer")
            return res.json(updatedFarmer);   
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


exports.changePicture = async (req,res) => 
{   
    console.log("updateFarmer picture")
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
    const farmerUUID = req.params.uuid;
    const uuid = req.user.uuid;
    if(uuid===farmerUUID)
    {
        if(!req.file){
           return res.status(500).send("file missing...")
        }
        const profileImage = req.file.filename;    
        console.log(profileImage);   
        try     
        {
            const updatedPicture = await Farmers.update({profileImage},{where:{uuid}});
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
    console.log("reached the route!");
    const schema = Joi.object(
        {
            userName: Joi.string().required(),
            password: Joi.string().min(8).required()
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
        if(!farmer) return res.status(400).send('User not found');
        const validPass = await bcrypt.compare(password,farmer.password);
        
        if(!validPass) return res.status(400).send('Invalid Password');
        const token = jwt.sign({uuid:farmer.uuid,type:'F'},"secret",{
            expiresIn:'300s'
        });
        const refreshToken = jwt.sign({uuid:farmer.uuid,type:'F'},"refreshSecret",{
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
        } catch (error) {
        return res.status(500).json(error);
    } 
};  

exports.addExperience = async (req,res) => 
{
    
    const uuid = req.user.uuid;
    console.log('req.user.uuid ',uuid);
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
        const farmer = await Farmers.findOne({attributes:['id'],where:{uuid}});
        const farmerId = farmer.id;
    console.log('farmerId ',farmerId);

        const experience = await FarmersExperience.create({farmingType,position,from,to,farmerId});
        return res.json(experience);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    } 
}; 

// exports.getExperiences = async (req,res) => 
// {
//     const uuid = req.user.uuid;
//         try {
//         const farmer = await Farmers.findOne ({attributes:['id'],where:{uuid}});
//          const farmerId = farmer.id;
//          const experiences = await FarmersExperience.findAll({where:{farmerId}});
//          return res.json(experiences);
//      } catch (error) {
//          return res.status(500).json(error);
    
//      } 
// }; 

// exports.getExperience = async (req,res) => 
// {
//     const uuid = req.params.exid;
//     try {

//         const experience = await FarmersExperience.findOne({uuid});
//         return res.json(experience);
//     } catch (error) {
//         return res.status(500).json(error);
    
//     } 
// }; 

exports.deleteExperience = async (req,res) => 
{   const uuid = req.user.uuid;
    const id = req.params.exid;
    console.log('inside delete experience ', id);

    {

        try {
            const experience = await FarmersExperience.findOne({where:{id},attributes:['farmerId']});
            console.log(experience.farmerId)
            const farmer = await Farmers.findOne({where:{uuid},attributes:['id']});
            console.log(farmer.id)
            if(experience.farmerId===farmer.id){
                const deletedExperience = await FarmersExperience.destroy({where:{id}});
                return res.json(deletedExperience);
            }else{
                return res.status(501).json({error:"resource not valid for this request!!"});
            }
        } catch (error) {
            return res.status(500).json(error);
            
        } 
    }
}; 


