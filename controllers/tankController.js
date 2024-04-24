//TODO: protect all non read routes
//TODO: use jwts to find logged in user data
//TODO: add neccesary joins
const express = require('express');
const router = express.Router();
const {Tank,Fish} = require('../models');
const jwt = require("jsonwebtoken")

//read all
router.get("/",(req,res)=>{
    Tank.findAll({
        include:[Fish]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//create
router.post("/",(req,res)=>{
    console.log(req.headers)
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const loggedInUser = jwt.verify(token,process.env.JWT_SECRET) 
        Tank.create({
           name:req.body.name,
            UserId:loggedInUser.id
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"oh no!",err})
        })
    }
    catch (error) {
        console.log(error);
        res.status(403).json({msg:"forbidden"})
    }
})

//read one
router.get("/:id",(req,res)=>{
    Tank.findByPk(req.params.id,{
        include:[Fish]
    }).then(data=>{
        if(!data){
            return res.status(404).json({msg:"no such Tank"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//edit one
router.put("/:id",(req,res)=>{
    Tank.update(req.body,
        {
            where:{
                id:req.params.id
            }
        }
    ).then(data=>{
        if(!data[0]){
            return res.status(404).json({msg:"no such Tank"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//delete one
router.delete("/:id",(req,res)=>{
    Tank.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        if(!data){
            return res.status(404).json({msg:"no such Tank"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

module.exports = router;