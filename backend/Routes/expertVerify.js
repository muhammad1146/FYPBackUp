const jwt = require('jsonwebtoken');

module.exports = function  (req,res,next)  {
    const type = req.user.type;
    console.log(req.user);
    if(type==='E'){
        next()
    }
    else{
        return res.status(403).send("Only Experts are allowed here.");
    }

};