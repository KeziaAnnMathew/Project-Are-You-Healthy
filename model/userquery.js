const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userlocal:userlocal@ruhfileslocal.mzi6m.mongodb.net/areyouhealthylocal?retryWrites=true&w=majority');
const Schema= mongoose.Schema;

// 'mongodb+srv://userme:userme@ruhfiles.twknm.mongodb.net/areyouhealthy?retryWrites=true&w=majority'
const QuerySchema = new Schema({
   heading:String,
   area:String,
   comments:String,
   suggestions:String,
   userid:String,
   img:String,
   date:Date
});

var Querydata = mongoose.model('querydata', QuerySchema);

module.exports = Querydata;