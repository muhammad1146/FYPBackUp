const express = require ( 'express');
const FarmerController = require ( '../Controllers/Farmer');
const adminVerify = require('./adminVerify');
const verifyToken = require('./verifyToken');
const router = express.Router();
// Farmers
router.post("/",FarmerController.addFarmer) // add/register farmer

router.get("/",verifyToken,FarmerController.getFarmers) // get farmers

router.get('/ranks',FarmerController.getRanks); //get All Farmer Ranks

router.post('/ranks',verifyToken,adminVerify,FarmerController.addRank); //get All Farmer Ranks

router.post("/login",FarmerController.farmerLogin) //  farmer login
//Farms 
router.get('/farms',verifyToken,FarmerController.getFarms); // get all farms of a farmer

router.post('/farms',verifyToken,FarmerController.addFarm); //add a farm

router.get('/farms/:farmid',verifyToken,FarmerController.getFarm); //get a farm

router.put('/farms/:farmid',verifyToken,FarmerController.editFarm); //edit a farm

router.delete('/farms/:farmid',verifyToken,FarmerController.deleteFarm); //delete a farm
// Farmer Experience
router.post('/experience',verifyToken,FarmerController.addExperience); //add an experience

router.get('/experience',verifyToken,FarmerController.getExperiences); // get all experiences data of a farmer

router.get('/experience/:exid',verifyToken,FarmerController.getExperience); //get an experience

router.delete('/experience/:exid',verifyToken,FarmerController.deleteExperience); //delete a farm
// Farmer Reports   
router.post('/:id/reports',verifyToken,FarmerController.addReportForFarmer); //Post new Farmer's Report

router.get('/:id/reports',verifyToken,FarmerController.getAllReportsForFarmers); //Get Farmer's Reports///get all reports reporting farmers

router.delete('/:id/reports/:frid',verifyToken,FarmerController.deleteAReportForFarmers); //Delete Report

router.get('/:id',verifyToken,FarmerController.getFarmer) // get farmer

router.put("/:id",verifyToken,FarmerController.updateFarmer) // edit a farmer

module.exports = router;
