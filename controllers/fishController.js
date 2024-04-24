//TODO: protect all non read routes
//TODO: use jwts to find logged in user data
//TODO: add neccesary joins

const express = require('express');
const router = express.Router();
const {Fish} = require('../models');
const tokenAuth = require('../middleware/tokenAuth');

//read all
router.get("/",(req,res)=>{
    Fish.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//create
router.post("/",tokenAuth,(req,res)=>{
    Fish.create({
        name:req.body.name,
        color:req.body.color,
        width:req.body.width,
        TankId:req.body.TankId
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//read one
router.get("/:id",(req,res)=>{
    Fish.findByPk(req.params.id).then(data=>{
        if(!data){
            return res.status(404).json({msg:"no such Fish"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//edit one
router.put("/:id",(req,res)=>{
    Fish.update(req.body,
        {
            where:{
                id:req.params.id
            }
        }
    ).then(data=>{
        if(!data[0]){
            return res.status(404).json({msg:"no such Fish"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

//delete one
router.delete("/:id",(req,res)=>{
    Fish.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        if(!data){
            return res.status(404).json({msg:"no such Fish"})
        }
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})

module.exports = router;