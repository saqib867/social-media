const router=require("express").Router()
const User=require('../model/User.js')

router.post('/register',(req,res)=>{
     
     const name=req.body.name;
     const email=req.body.email;
     const password=req.body.password
     
     User.findOne({email})
     .then(findUser=>{
          console.log('find user',findUser) 
          if(!findUser){
               
               const newUser= new User({name,email,password});
     
               newUser.save()
               .then(response=>{
                   res.status(200).json(response)
                   
               })
               
          }
          else{
               res.send(null)
          }
     })

          
});

router.post('/login',async (req,res)=>{
     try{
     const user=await User.findOne({email:req.body.email});
     if(!user){
          res.json(0)
     }
     else if(user.password!==req.body.password){
     
          res.json(1)
     }
     else{
        
          res.status(200).send(user)  
          console.log(user)  
      }
     
     }
     catch(err){
          res.status(500).send(err)
     }
})
module.exports=router