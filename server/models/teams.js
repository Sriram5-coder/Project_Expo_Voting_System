const mongoose=require('mongoose')

const TeamSchema=new mongoose.Schema({
    teamname:String
})

const TeamModel=mongoose.model("team",TeamSchema);
module.exports=TeamModel;