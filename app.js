const express = require('express');
const app= new express();
const port = 3000;
const Userdata=require("./model/userdata");
const Admindata=require("./model/admindata");
const cors = require('cors');
var bodyparser= require('body-parser');
app.use(cors());
const jwt=require('jsonwebtoken')
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(require('path').join(__dirname,'/public')));
const userRouter= require('./routes/userroutes')(app);
const adminRouter=require('./routes/adminroutes')(app);
app.use('/profile',userRouter);
app.use('/admin',adminRouter);
app.post('/login/user',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    let userdataname= req.body.user.email;
    let userdatapassword=req.body.user.password;
    Userdata.findOne({$or: [{uname:userdataname},{email:userdataname}],password:userdatapassword},(err,doc)=>{
            if(!doc){
                res.send({doc:doc});
               }    
            else{
                let payload={subject:userdataname+userdatapassword}
                let token=jwt.sign(payload,'secretKey')
                res.send({doc:doc,token:token});
               }
    })
});
app.post('/login/admin',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    let userdataname= req.body.user.email;
    let userdatapassword=req.body.user.password;
        Admindata.findOne({$or: [{uname:userdataname},{email:userdataname}],password:userdatapassword},(err,doc)=>{
            if(!doc){
                res.send({doc:doc});
               }    
            else{
                let payload={subject:userdataname+userdatapassword}
                let token=jwt.sign(payload,'secretKey')
                res.send({doc:doc,token:token})
               }
    })
});
app.post('/adduser', function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    img='http://localhost:3000/images/profile.png';
        var item = {
            fname:req.body.user.fname,
            lname:req.body.user.lname,
            email:req.body.user.email,
            uname:req.body.user.uname,
            password:req.body.user.password,
            gender:req.body.user.gender,
            height:req.body.user.height,
            weight:req.body.user.weight,
            bmi:req.body.user.bmi,
            pulse:req.body.user.pulse,
            img:img,
            permission:"user"
        }
        var user= Userdata(item);
        user.save();
});
app.listen(port,()=>{
    console.log("Server ready at port:"+port);
});