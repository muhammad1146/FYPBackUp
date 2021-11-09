const jwt = require('jsonwebtoken');

module.exports = function  (req,res,next)  {
    const type = req.user.type;

    if(type==='A'){
        next()
    }
    else{
        return res.status(403).send("Only Admin is allowed here.");
    }

};