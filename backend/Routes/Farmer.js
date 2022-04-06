const express = require ( 'express');
const FarmerController = require ( '../Controllers/Farmer');
const cookieParser = require('cookie-parser');
const adminVerify = require('./adminVerify');
const verifyToken = require('./verifyToken');
const upload = require('../Controllers/ImageManagement'); 

const router = express.Router();
router.use(cookieParser());

// Farmers
router.post("/",upload.single('profileImage'),FarmerController.addFarmer) // add/register farmer (image included)


router.get("/",verifyToken,FarmerController.getFarmers) // get farmers

// Farmer Reports   
router.post('/reports/:id',verifyToken,FarmerController.addReportForFarmer); //Post new Farmer's Report

router.get('/reports/:id',verifyToken,FarmerController.getAllReportsForFarmers); //Get Farmer's Reports///get all reports reporting farmers

router.delete('/reports/:id/:frid',verifyToken,FarmerController.deleteAReportForFarmers); //Delete Report

router.delete('/experiences/:exid',verifyToken,FarmerController.deleteExperience); //Delete Experience

router.post('/experiences',verifyToken,FarmerController.addExperience); //Delete Experience

router.get('/ranks',FarmerController.getRanks); //get All Farmer Ranks

router.post('/ranks',verifyToken,adminVerify,FarmerController.addRank); //get All Farmer Ranks

router.post("/login",FarmerController.farmerLogin) //  farmer login
//Farms 
router.get('/:username/farms',verifyToken,FarmerController.getFarms); // get all farms of a farmer

router.post('/:username/farms',verifyToken,upload.array("farmImages",5),FarmerController.addFarm); //add a farm (image included)

router.get('/:username/farms/:farmid',verifyToken,FarmerController.getFarm); //get a farm

router.put('/:username/farms/:farmid',verifyToken,FarmerController.editFarm); //edit a farm

router.delete('/:username/farms/:farmid',verifyToken,FarmerController.deleteFarm); //delete a farm



router.get('/:id',verifyToken,FarmerController.getFarmer) // get farmer

router.put("/:id",verifyToken,FarmerController.updateFarmer) // edit a farmer

module.exports = router;
