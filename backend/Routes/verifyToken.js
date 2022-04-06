const jwt = require('jsonwebtoken');

function verifyJWT(token,secret) {
  try {
    const decoded = jwt.verify(token, secret);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
module.exports = function  (req,res,next)  {
    console.log("token checking started")
    let {accessToken,refreshToken} = req.cookies;
  if(accessToken && refreshToken)
  {
    const {payload,expired} = verifyJWT(accessToken,"secret"); //accessToken validation
    if(payload){
      req.user = payload;
      console.log("accessToken is valid ",payload)
      return next()
      }
      else if(expired) { //accessToken expired
      let {payload,expired} = verifyJWT(refreshToken,"refreshSecret");
      if(payload){
        let uuid = payload.uuid, type=payload.type
        let newAccessToken = jwt.sign({uuid,type},"secret",{expiresIn:"900s"});
        res.cookie("accessToken",newAccessToken,{
          maxAge:60000*15
        })
        console.log("access token refreshed!! ")
        req.user= verifyJWT(newAccessToken,"secret").payload;
        return next()
      }else if(expired){
        return res.send(expired);
      }
      }
    }
    else if (refreshToken && !accessToken)
    {
      console.log("no accessToken is given, so refresh token will be used for it!!");
      let {payload,expired} = verifyJWT(refreshToken,"refreshSecret" );
      console.log(verifyJWT(refreshToken,"refreshSecret"));

      if(payload){
        let uuid = payload.uuid, type= payload.type;
        let newAccessToken = jwt.sign({uuid,type},"secret",{expiresIn:"900s"});
        res.cookie("accessToken",newAccessToken,{
          maxAge:60000*15
        })
        req.user= verifyJWT(newAccessToken,"secret").payload;
        return next()
      } else if(expired){
        console.log("refreshToken is expired too");

        return res.send("Login Again")
      }
    }
    else {
      return res.send("No Token Found!");
    }
// if((accessToken))
//      return res.status(401).send('access denied,bcz no jwt token!');
//         const {payload,expired} = verifyJWT(accessToken);
//         if(payload){
//         req.user = payload;
//         console.log(payload);
//         console.log("token checking ended, without refreshing....")
//         next()
//         }
        
//         const refresh = expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
//     console.log("refresh Object is this: "+refresh[0])
//     if(refresh.expired){
//     //refresh token expired too
//         return res.status(402).send("Login Again!");
//     }
//     else{
//       const newAccessToken = jwt.sign(refresh.payload, "secret",{
//           expiresIn:'300s'});   
//           console.log("new AccessToken generated!");
//           res.cookie("accessToken",newAccessToken,{
//               maxAge:300000
//           })
        
//     }
//     }

}