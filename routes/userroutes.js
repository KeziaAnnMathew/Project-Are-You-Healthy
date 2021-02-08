const express = require('express');
const userRouter=express.Router();
const Userdata=require("../model/userdata");
const Querydata=require("../model/userquery")

const jwt=require('jsonwebtoken');

const multer= require ('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/images');
      },
      filename: (req, file, cb) => {
        // cb(null, 'image-' + Date.now() + '.' + filetype);
        cb(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname));
      }
});
const upload=multer({
storage:storage
});


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
    userRouter.get('/:id',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        Userdata.findOne({_id:id},(err,doc)=>{
            if(!doc){
                res.send(doc);
               }  
            else{
                res.send(doc);
            }
        }) 
    });
    userRouter.get('/queries/:id',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        Querydata.find({userid:id},(err,doc)=>{
            if(!doc){
                res.send(doc);
               } 
               else{
                   res.send(doc);
               }
        }).sort({date:-1})

    })
    userRouter.get('/query/:id',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        Querydata.findOne({_id:id},(err,doc)=>{
            if(!doc){
                res.send(doc);
               } 
               else{
                   res.send(doc);
               }
        })
    })
    userRouter.post('/addquery/:id',verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        var queryval={
            heading:req.body.query.heading,
            area: req.body.query.area,
            comments: req.body.query.comments,
            suggestions:'',
            date:new Date(),
            userid:id
        }
        var queryItem= Querydata(queryval);
        queryItem.save();
    })
    userRouter.put('/editquery/:id',verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        var queryval={
            heading:req.body.query.heading,
            area: req.body.query.area,
            date:new Date(),
            comments: req.body.query.comments
        }
        Querydata.findByIdAndUpdate({_id:id},queryval,(err,doc)=>{
            res.send({doc:doc})
        })
    })
    userRouter.delete('/deletequery/:id',verifyToken,function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        Querydata.findByIdAndRemove({_id:id},(err,doc)=>{
            res.send({doc:doc})
        })
    })
    userRouter.put('/editprofile/:id',upload.single('img'),function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        if(req.file){
            img='http://localhost:3000/images/'+req.file.filename;
        }
        else{
            img=req.body.img;
        }
        var profval={
            height:req.body.height,
            weight:req.body.weight,
            pulse:req.body.pulse,
            bmi:req.body.bmi,
            gender:req.body.gender,
            img:img
        }
        Userdata.findByIdAndUpdate({_id:id},profval,(err,doc)=>{
            res.send({doc:doc})
        })
    })
    userRouter.put('/editprofile/changepwd/:id',function(req,res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
        const id=req.params.id;
        var profval={
            password:req.body.password
        }
        Userdata.findByIdAndUpdate({_id:id},profval,(err,doc)=>{
            res.send({doc:doc})
        })
    })

    return userRouter;
}


module.exports = router;