const jwt = require("jsonwebtoken")
const tokenAuth = (req,res,next)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const loggedInUser = jwt.verify(token,process.env.JWT_SECRET) 
        req.user = loggedInUser
        next()
    }
    catch (error) {
        console.log(error);
        res.status(403).json({msg:"forbidden"})
    }
}

module.exports = tokenAuth