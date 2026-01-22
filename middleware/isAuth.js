const jwt = require("jsonwebtoken")

const isAuth = async (req,res,next) => {
    const token = req.cookies["JWT-Token"];
    
    if(!token){
      console.log("token not send")
        return res.status(403).json({
        success: false,
        message: "Unauthorize, JWT Token required"
      })
    }
    try{
        const decode = jwt.verify(token,"JWT_SECRETE")
        req.user = decode;
        next();
    }catch(err){
      console.log("error in verfying token")
        return res.status(403).json({
        success: false,
        message: "Unauthorize, JWT Token required"
      })        
    }
}

module.exports = isAuth;