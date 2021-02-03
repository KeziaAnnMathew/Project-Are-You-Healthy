const express = require('express');
const adminRouter=express.Router();
const Userdata=require("../model/userdata");
const Querydata=require("../model/userquery");

const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1];
    if(token=="null"){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()  
}


function router(){
    adminRouter.get('/getprofiles',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        Userdata.find()
        .then(function(profiles){
            res.send(profiles)
        })
    })
    adminRouter.put('/addsuggestion/:id',verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        var queryval={
            suggestions: req.body.suggestions
        }
        Querydata.findByIdAndUpdate({_id:id},queryval,(err,doc)=>{
            res.send({doc:doc})
        })
    })
    return adminRouter;
}

module.exports = router;