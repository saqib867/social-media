const router=require('express').Router()

const Post=require('../model/Post');
const User=require('../model/User')

//create a post


router.post('/newpost',(req,res)=>{
     
     const newPost=new Post(req.body)
     newPost.save()
     .then(response=>{
             res.status(200).json(response)
     })
     .catch(err=>{
          res.status(500).json(err)
     })
})
//update a post

router.put('/:id',(req,res)=>{
     Post.findById(req.params.id)
     .then(response=>{
          if(response.userId===req.body.userId){
               
               response.updateOne({$set:req.body})
               .then(()=>{
                    res.status(200).json('The post has been updated')
               })
             
          }
          else{
               res.status(403).json('You can update only your post')
          }
     })
     .catch(err=>res.status(500).json(err))
     
})
//delete a post
router.delete('/:id',(req,res)=>{
     Post.findById(req.params.id)
     .then(response=>{
          if(response.userId===req.body.userId){
               
               response.deleteOne()
               .then(()=>{
                    res.status(200).json('The post has been deleted')
               })
             
          }
          else{
               res.status(403).json('You can delete only your post')
          }
     })
     .catch(err=>res.status(500).json(err))
     
})
//like a post

router.put('/like/:id',(req,res)=>{
     
     Post.findById(req.params.id)
     .then(response=>{
          
          if(!response.likes.includes(req.body.email)){
               response.updateOne({$push:{likes:req.body.email}})
               
               .then(()=>{
                    res.status(200).json('1')
               })
          }
          else{
               response.updateOne({$pull:{likes:req.body.email}})
               .then(()=>{
                    res.status(200).json('0')
               })
               .catch(err=>console.log('comment err',err))
          }
     })
})
router.post('/comment/:postId',(req,res)=>{

     Post.findById(req.params.postId)
     .then(response=>{
          
          response.updateOne({$push:{comments:req.body}}) 
          .then(getRes=>{
               res.send(getRes)
          })
          
     })
     .catch(err=>console.log('comment err',err))
})

//get a Post


router.put('/getpost/:id',(req,res)=>{

       Post.findById(req.params.id)
       .then(response=>{
            res.status(200).json(response)
       })
       .catch(err=>res.status(500).json(err))
})
//get timeline(friends that a user following) posts


router.get('/timeline/:userId', async(req,res)=>{
  try{
            
            const currentUser=await User.findOne({_id:req.params.userId})
              
              const userPosts=await Post.find({userId:currentUser._id})
              const friendsPost= await Promise.all(
                   currentUser.followings.map((friendId)=>{
                       return Post.find({userId:friendId})
                   })  
                 );
               res.json(userPosts.concat(...friendsPost))  
  }
     catch(err){res.status(500).json(err)}
     
})

//get a user all posts

router.get('/profile/:userId',async(req,res)=>{

     const user=await User.findOne({_id:req.params.userId})
     const userPosts=await Post.find({userId:user._id})
     res.status(200).json(userPosts)
          
})

//get all friends a user is following

  

module.exports=router