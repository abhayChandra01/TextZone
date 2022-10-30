const mongoose = require("mongoose");

const textSchema = mongoose.Schema(
    {
        senderid:{
            type:String,
            required:true,
        },      
        receiverid:{
            type:String,
            required:true,
        },    
        textcontent:{
            type:String,
            required:true,
        },
        
    },
    {
        timestamps : { createdAt:true,updatedAt:true},
    }
)

module.exports = mongoose.model("text",textSchema)