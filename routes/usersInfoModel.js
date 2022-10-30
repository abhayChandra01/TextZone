const mongoose = require("mongoose");

const usersInfoSchema = mongoose.Schema(
    {
        number:{
            type:String,
            required:true,
        },      
        name:{
            type:String,
            required:true,
        },    
        image:{
            type:String,
            required:true,
        },
        
    },
    {
        timestamps : { createdAt:true,updatedAt:true},
    }
)

module.exports = mongoose.model("usersinfo",usersInfoSchema)