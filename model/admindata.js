const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userlocal:userlocal@ruhfileslocal.mzi6m.mongodb.net/areyouhealthylocal?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const AdminSchema = new Schema({
    email:String,
    uname:String,
    password:String,
    permission:String
});

var Admindata = mongoose.model('admindata', AdminSchema);

module.exports = Admindata;