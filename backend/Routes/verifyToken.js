const jwt = require('jsonwebtoken');

module.exports = function  (req,res,next)  {
    const token = req.header('auth-token');
    if(!token ) return res.status(401).send('access denied');

    try {
        const payload = jwt.verify(token,'secret');
        
        req.user = payload;
        console.log(payload);
        next()
    } catch (error) {
        res.status(400).send('invalid token');
    }

} 