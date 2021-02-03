const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userme:userme@ruhfiles.twknm.mongodb.net/areyouhealthy?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const AdminSchema = new Schema({
    email:String,
    uname:String,
    password:String,
    permission:String
});

var Admindata = mongoose.model('admindata', AdminSchema);

module.exports = Admindata;