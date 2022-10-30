var express=require("express")
var router=express.Router()
var usersInfo =require("./usersInfoModel")
var upload=require('./multer')


router.get("/getallusers",function(req,res){
    usersInfo.find({},function(err,data){
        if(err)
        {
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            res.status(200).json({ result:data,status:true,data, message: "Data Found" })
        }
  
    })
  
  })

router.post("/getuserbynumber",function(req,res){

    var number = req.body.number
    usersInfo.find({number:number},function(err,data){
        if(err)
        {
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            res.status(200).json({ result:data,status:true,data, message: "Data Found" })
        }
  
    })
  
  })

router.post("/getuserexceptone",function(req,res){

    var number = req.body.number
    usersInfo.find({number:{ $ne: number }},function(err,data){
        if(err)
        {
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            res.status(200).json({ result:data,status:true,data, message: "Data Found" })
        }
  
    })
  
  })


router.post("/adduser",function(req,res){
    console.log(req.body)
   
    const user=  new usersInfo(req.body)
        user.save(function(err,data){
        if(err)
        {
            res.status(500).json({ status:false,message:err.toString() })
        }
        else
        {
            console.log(data)
            res.status(200).json({ result:data,status:true,data, message: "User Created" })
        }

    })
})

router.post("/editusername",function(req,res){
    console.log(req.body)
   
    const name = req.body.name
    const id = req.body.id

    var add = usersInfo.findOneAndUpdate({_id:id},{name:name},function(err ,data){
        if(err)
        {
            console.log("ERROR =>",err);

            res.status(500).json({status:false,message:err.toString() })
        }
        else
        {
            res.status(200).json({result:data,status:true,message:"Name Edited Successfully !"})
            console.log("DATA =>",data);
        }

    })

})


router.post("/addimage",upload.single("image"),function(req,res){

    console.log(req.body);
    var imageName = req.filename
    console.log(imageName)
    var number = req.body.number
    var add = usersInfo.findOneAndUpdate({number:number},{image:imageName},function(err ,data){
        if(err)
        {
            console.log("ERROR =>",err);

            res.status(500).json({status:false,message:err.toString() })
        }
        else
        {
            res.status(200).json({result:data,status:true,message:"Image Added Successfully !"})
            console.log("DATA =>",data);
        }

    })



})




module.exports = router;