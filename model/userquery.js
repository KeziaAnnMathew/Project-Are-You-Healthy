const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userme:userme@ruhfiles.twknm.mongodb.net/areyouhealthy?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const QuerySchema = new Schema({
   heading:String,
   area:String,
   comments:String,
   suggestions:String,
   userid:String
   // date:Date
});

var Querydata = mongoose.model('querydata', QuerySchema);

module.exports = Querydata;