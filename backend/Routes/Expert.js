
const express = require ( 'express');
const ExpertController = require ( '../Controllers/Expert');
const verifyToken = require('./verifyToken');
const upload = require('../Controllers/ImageManagement'); 
const router = express.Router();
require('dotenv').config();
// Experts 

router.post('/ranks',ExpertController.addExpertRank) // add Expert Rank 

router.get('/ranks',ExpertController.getExpertRanks) // get Expert ranks 

router.put('/ranks/:rankid',ExpertController.editExpertRank) // edit Expert rank 

router.post('/experience',verifyToken,ExpertController.addExpertExperience) // add Expert experience

router.get('/experience',verifyToken ,ExpertController.getExperiences) //Get Expert Exoeriences

router.get('/experience/:eeid',verifyToken,ExpertController.getExpertExperience) // get Expert experience

router.put('/experience/:eeid',verifyToken,ExpertController.editExpertExperience) // edit Expert experience

router.delete('/experience/:eeid',verifyToken,ExpertController.deleteExpertExperience) // delete Expert experience

router.post('/qualification',verifyToken,ExpertController.addExpertQualification) // add/register Expert

router.delete('/qualification/:id',verifyToken,ExpertController.deleteExpertQualification); // get Expert Qualification


router.post('/login',ExpertController.expertLogin) // Expert login

router.get('/',verifyToken,ExpertController.getExperts) // get All Experts 

router.get('/search',verifyToken,ExpertController.searchExperts) // get All Experts 

router.get('/all',ExpertController.getAllExperts) // get All Experts 

router.get('/:uuid',verifyToken,ExpertController.getExpert) // get Expert

// router.get('/:username',verifyToken,ExpertController.getExpert) // get Expert


router.put("/:eid",verifyToken,ExpertController.editExpert) // edit Expert

//Expert Reports
router.post('/:eid/reports',verifyToken,ExpertController.addExpertReport); //Post Expert's Report

router.get('/:eid/reports',verifyToken,ExpertController.getAllReports); //get All Reports by Expert

router.delete('/:eid/reports/:erid',verifyToken,ExpertController.deleteExpertReport); //Delete Report

router.put("/:uuid/picture",verifyToken,upload.single('profileImage'),ExpertController.changePicture) // edit a farmer

router.post('/',ExpertController.addExpert) // add/register Expert (image included)


module.exports = router;
