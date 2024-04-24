const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const userRoutes = require("./userController");
router.use("/api/users",userRoutes)

const tankRoutes = require("./tankController");
router.use("/api/tanks",tankRoutes)

const fishRoutes = require("./fishController");
router.use("/api/fishes",fishRoutes)

router.get("/tokenData",(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const tokenData = jwt.verify(token,process.env.JWT_SECRET);
        res.json({
            validToken:true,
            userId:tokenData.id
        })
    } catch (error) {
        console.log(error)
        res.json({validToken:false})
    }
})

module.exports = router;