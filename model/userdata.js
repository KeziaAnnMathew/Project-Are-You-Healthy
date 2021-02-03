const mongoose =require("mongoose");
const { stringify } = require("querystring");
mongoose.connect('mongodb+srv://userme:userme@ruhfiles.twknm.mongodb.net/areyouhealthy?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const UserSchema = new Schema({
    fname:String,
    lname:String,
    uname:String,
    email:String,
    password:String,
    gender:String,
    height:Number,
    weight:Number,
    bmi:Number,
    pulse:Number,
    img:String,
    permission:String
});

var Userdata = mongoose.model('userdata', UserSchema);

module.exports = Userdata;