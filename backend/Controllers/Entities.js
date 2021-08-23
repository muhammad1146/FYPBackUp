const {Farmers,Experts,experienceFarmers,Farms,RankExperts,expertExperience,
    expertQualification} = require('../models');

exports.getFarmers = async (req,res,next) => {
    try {
        const users = await Farmers.findAll({include:RankFarmers});
        return res.json(users);
        
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.getFarmer = async (req,res) => {
const id = req.params.id;
try {
    const user = await Farmers.findOne({include:[RankFarmers,experienceFarmers,Farms]}, {where:{id}});
    return res.json(user);
} catch (error) {
    return res.status(500).json(error);

} 
}
exports.updateFarmerFarm = async (req,res) => {
    const farmId = req.params.fid;
    const {farmName,farmSize,numberOfCattle,farmLocation,farmType,images} = req.body;
    try {
        const farm = await Farms.update({farmName,farmSize,numberOfCattle,farmLocation,farmType,images},{where:{id:farmId}});
        return res.json(farm);
    } catch (error) {
        return res.status(500).json(farm);
    }

}


exports.updateFarmerInfo = async (req,res,next) => {
    const id = req.params.id;
    const {name,address,phoneNumber,description} = req.body;
   
   
    try {
        const updatedUser = await Farmers.update({name,address,phoneNumber,description},{where:{id}});
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.addFarmer = (req,res,next) => {
  //  res.send("Post Request for users");
    const {name,phoneNumber,address,username,farmingType,rankId,
        description,profileImage} = req.body.farmer;
   // farm data
        const {farmName,farmSize,startDate,endDate,farmType,animals,farmLocation,numberOfFarms} = req.body;
  //  const {farmingTypeExperience,position,eStartDate,eEndDate} = req.body.farmerExperience;
    const farmer = await Farmers.create({
        name,phoneNumber,address,username,farmingType,rankId,description,profileImage
      }, { transaction: t });
    const farms = [],userExperienceBox = [];
    for (let j=0; j<numberOfExperiences; j++){
        const exper = {
            farmType:req.body.farmerExperience.farmingTypeExperience[j],
            position:req.body.farmerExperience.position[j],
            startDate:req.body.farmerExperience.startDate[j],
            endDate:req.body.farmerExperience.endDate[j],
            farmerId: farmer.id
        }
        userExperienceBox.push(exper);
    }
    for(let j = 0; j <numberOfFarms; j++){
        const farm = {
            farmName,
            startDate,endDate,farmType,animals,farmSize,farmLocation,farmerId:farmer.id
        };
        farms.push(farm);
    };
    const result = await sequelize.transaction(async (t) => {
        const userFarms = await Farms.bulkCreate(Farms, {returning:true},{transaction:t});
        // const captains = await Captain.bulkCreate([
        //     { name: 'Jack Sparrow' },
        //     { name: 'Davy Jones' }
        //   ]);
        const userExperience = await experienceFarmers.bulkCreate(userExperienceBox,{returning:true},{transaction:t});
        return res.json(userFarms,userExperience);
        
    });
    result.farmer= farmer;
    res.json(result);

};

exports.deleteFarmer = async(req,res,next) => {
  const id = req.params.id;
  try {
      const user = await Farmers.destroy({where:{id}});
      return res.json(user);
  } catch (error) {
      return res.status(500).json(error);
  }

};

//experts
exports.getExperts = async(req,res,next) => {
   
    try {
        const experts = await Experts.findAll({include:[RankExperts,expertExperience,expertQualification]});
        return res.json(experts);
    } catch (error) {
       return res.status(500).json(error); 
    }
};

exports.getExpert = async (req,res) => {
    const id = req.params.eid;
    try {
        const experts = await Experts.findOne({include:[RankExperts,expertExperience,expertQualification]},{where: {id}});
        return res.json(experts);
    } catch (error) {
       return res.status(500).json(error); 
    }
}
// at signup
exports.addExpert =async (req,res) => {
    const {name,userName,phoneNumber,address,date,profileImage,description,rankId,experties} = req.body;
    const {qualification,duration,percentage,institution} = req.body;
    const {institute,startDate,endDate,position} = req.body;
    
    try {
    const expert = await Experts.create({name,userName,phoneNumber,address,date,profileImage,
        description,rankId,experties});
        let expertId = expert.id;
        const expertEdu = await expertQualification.create({qualification,duration,percentage,institution,expertId} );
        const expertExp = await expertExperience.create({institute,startDate,endDate,position,expertId});
        return res.json(expert,expertEdu,expertExp);   
    } catch (error) {
        return res.status(500).json(error);
    }
};


exports.updateExpertInfo = async (req,res) => {
    const id = req.params.eid;
    const {name,phoneNumber,address,date,profileImage,description,experties} = req.body;
    try {
        const updatedExpert = await Experts.update({name,phoneNumber,address,profileImage,description,experties},{where:{id}});
        return res.json(updatedExpert);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.updateExpertEducation = async (req,res) => {

//     const id = req.params.eeid;
//     const {qualification,percentage,}


// }
// adding Qualification later
exports.addExpertQualification = async (req,res) => {
    const id = req.params.eid;
    const {qualification,startDate,endDate,percentage,institution} = req.body;
    try {
        const education = await expertQualification.create({qualification,startDate,endDate,percentage,institution,expertId:id});
        return res.json(education);
    } catch (error) {
        return res.status(500).json(error);
    }

}
// adding experience later
exports.addExpertExperience = async (req,res) => {
    const id = req.params.eid;
    const {institute,startDate,endDate,position} = req.body;
    try {
        const experience = await expertExperience.create({institute,startDate,endDate,position,expertId:id});
        return res.json(experience);
    } catch (error) {
        return res.status(500).json(error);
    }

}

exports.deleteExpert = async (req,res) => {

const {expertId} = req.body;
try {
    const expert = await Experts.destroy({where:{id:expertId}});
    return res.json(expert);
} catch (error) {
    return res.status(500).json(error);
}
};
