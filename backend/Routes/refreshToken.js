const jwt = require('jsonwebtoken');

module.exports = function  (req,res,next)  {
    console.log("token refreshing started")
    const { access-token, refresh-token } = req.cookies;
   const { payload, expired } = verifyJWT(accessToken,"secret");

    try {
        const payload = jwt.verify(token,'secret');
        
        req.user = payload;
        console.log(payload);
    console.log("token refreshing ended")
        
        next()
    } catch (error) {
        res.status(400).send('invalid token');
    }

} 