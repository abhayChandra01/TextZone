var express=require("express")
var router=express.Router()
var text =require("./textModel")

router.post("/sendtext",function(req,res){
    // console.log(req.body)
   
    const t =  new text(req.body)
        t.save(function(err,data){
        if(err)
        {
            console.log(err);
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            // console.log(data)
            res.status(200).json({ result:data,status:true,data, message: "Text Sent !" })
        }

    })
})

router.post("/fetchtexts",function(req,res){
    // console.log(req.body)
   
    const sid = req.body.sid
    const rid = req.body.rid

    text.find({senderid:sid , receiverid:rid },function(err,data){
        if(err)
        {
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            // console.log(data)
            res.status(200).json({ result:data,status:true,data, message: "Data Found" })
        }
  
    })
    
})

module.exports = router;