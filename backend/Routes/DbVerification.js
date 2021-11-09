const jwt = require('jsonwebtoken');
const {Experts,Farmers} = require("../models");
module.exports = function  (req,res,next)  {
    const type = req.user.type;
    const uuid = req.user.uuid;

    if(type==='A'){
        const expert = Experts.findOne({attributes:['id'],Where:{uuid}});
        if(expert.id) next()
        return res.status(401).send("Token invalid,login again");
        
    }
    else if(type==='F'){
        const farmer = Farmers.findOne({attributes:['id'],Where:{uuid}});
        if(farmer.id) next()
        return res.status(401).send("Token is invalid, login again")
    }
    else{
        return res.status(403).send("Only Admin is allowed here.");
    }

};