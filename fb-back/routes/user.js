const router=require('express').Router();
const User=require('../model/User')

//update user

router.put('/updateUser/:id',(req,res)=>{

     if(req.params.id !=='' || req.body.idAdmin){
        
        User.findByIdAndUpdate(req.params.id,{
             $set:req.body,
          })
        .then((response)=>{
              res.status(200).json(response)
        })
        .catch(err=>res.status(400).json(err))
     }
     
     else{
          return res.status(403).json('You can update only your data')
     }

})
//delete user

router.delete('/:id',(req,res)=>{

     if(req.body.userId===req.params.id || req.body.idAdmin){
        
           User.findByIdAndDelete(req.params.id)
           .then((response)=>{
                res.status(200).json('Account has been deleted successfully')
     })
     }
     
     else{
          return res.status(403).json('You can delete only your account and post')
     }

})
//get a user

router.get('/',async(req,res)=>{

          const userId=req.query.userId;
          const email=req.query.email
          try{

               const user=userId
               ? await User.findById({_id:userId})
               : await User.findOne({email:email})
               const {password,updatedAt,...other}=user._doc;
               res.status(200).json(other) 
               
          }
          catch(err){
               res.status(500).json(err)
          }
})
// follow a user 

router.put('/follow/:id',async (req,res)=>{

     if(req.body.userId!==req.params.id){
          try{
               const user=await User.findById(req.params.id);
               const currentUser=await User.findById(req.body.userId)
               if(!user.followers.includes(req.body.userId)){
                     
                      await user.updateOne({$push:{followers:req.body.userId}})
                      await currentUser.updateOne({$push:{followings:req.params.id}})
                      //follow the user
                      res.status(200).json('1')
               }
               else{
                    // you are already following the user
                    res.json('0')
               }
          }catch(err){
               res.status(500).json(err)
          }
         
     }
     else{
          res.status(403).json("You can't follow yourself")
     }
})

// get user Following info

router.get('/friends/:userId',async(req,res)=>{
      
    try{
     const user=await User.findById(req.params.userId);
     const friends=await Promise.all(
          user.followings.map(friendId=>{
              return User.findById(friendId)
          })
     )
    /* let friendList=[]
     friends.map(friend=>{
          const {_id,name,profilePicture}=friend;
          friendList.push({_id,name,profilePicture})
     })*/

       res.status(200).json(friends)
    }
    catch(err){
         res.json(err)
    }
})
    

// unfollow a user

router.put('/unfollow/:id',async (req,res)=>{

     if(req.body.userId!==req.params.id){
          try{
               const user=await User.findById(req.params.id);
               const currentUser=await User.findById(req.body.userId)
               if(user.followers.includes(req.body.userId)){
                     
                      await user.updateOne({$pull:{followers:req.body.userId}})
                      await currentUser.updateOne({$pull:{followings:req.params.id}})
                      res.status(200).json('user has been unfollowed ')
               }
               else{
                    res.status(403).json('You already unfollows this user')
               }
          }catch(err){
               res.status(500).json(err)
          }
         
     }
     else{
          res.status(403).json("You can't unfollow yourself")
     }
})

router.get('/allUser',(req,res)=>{
     
     User.find()
     .then(response=>{
          
          res.status(200).json(response)
     })
})
router.get('/search',async(req,res)=>{
        const searchTerm=".*"+req.query.search+".*"
     let getUsers = []
     //console.log(req.user._id)
     
       try{ 
       const getSearchedUser=await User.find({name:{$regex:searchTerm,$options:'i'}})
             
             getSearchedUser.forEach(user=>{
                  const{name,email,profilePicture}=user
              getUsers.push({name,email,profilePicture})
             })       
             console.log('ussseeerrrsss',getUsers)
             res.status(200).send(getUsers) 
       }
       catch(err){
                console.log('error',err)
       } 
        
        
})

module.exports =router