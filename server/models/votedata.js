const mongoose=require('mongoose')

const Voteschema=new mongoose.Schema({
    rollNumber:String,
    selectedTeam:String,
    ipAddress:String
})

const VoteModel=mongoose.model("vote",Voteschema);
module.exports=VoteModel;


