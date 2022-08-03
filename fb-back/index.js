const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')
const userRoutes=require('./routes/user')
const authRoute=require('./routes/auth')
const postRoutes=require('./routes/post')
const Post=require('./model/Post');
const path = require('path')
const User = require('./model/User')
const dotenv=require('dotenv')
const {GridFsStorage}=require("multer-gridfs-storage")
const Grid =require("gridfs-stream")


Grid.mongo=mongoose.mongo

//app config      app config again
dotenv.config()
const app=express()
app.use(express.json());
app.use(cors())
mongoose.Promise = global.Promise;
//App Middleware
const port=process.env.PORT || 5000;

/*const storage=multer.diskStorage({
     destination:(req,file,cb)=>{
          cb(null,'./public/images')
     },
     filename:(req,file,cb)=>{
          
          cb(null,Date.now()+file.originalname)
     }
})*/

const mongoURL='mongodb://saqibhussain:rSs0PP3zistZOG9K@cluster0-shard-00-00.naf81.mongodb.net:27017,cluster0-shard-00-01.naf81.mongodb.net:27017,cluster0-shard-00-02.naf81.mongodb.net:27017/fb-clone?ssl=true&replicaSet=atlas-w28x4m-shard-0&authSource=admin&retryWrites=true&w=majority'
//const mongoURL='mongodb+srv://saqibhussain:rSs0PP3zistZOG9K@cluster0.naf81.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURL,{useUnifiedTopology:true})
.then(()=>console.log('database connected sucessfully'))    
.catch(err=>console.log('database connection error'))      

const conn=mongoose.createConnection(mongoURL,{
     useNewUrlParser:true,
     useUnifiedTopology:true,
     useFindAndModify:false
}) 
 let gfss;
 let gridBucket
conn.once('open',()=>{
    // gridBucket= new mongoose.mongo.GridFSBucket(conn.db, {
      //    bucketName: "uploads"
       // });
     gfss = Grid(conn.db,mongoose.mongo);
    gfss.collection("images")
      
}).then(response=>{
     console.log('Database connected succesfully')
}).catch(err=>console.log('Connection error'))

const storage=new GridFsStorage({
     url:mongoURL,
     options:{useNewUrlParser:true,useUnifiedTopology:true},
     file:(req,file)=>{
          return new Promise((resolv,reject)=>{
               {
               const filename=`image-${Date.now()}${path.extname(file.originalname)}`
               const fileInfo={
                    filename:filename,
                    bucketName:'images'
               }
               resolv(fileInfo)
          }
     })
     }
})

const upload=multer({storage})
app.get('/retrive/images/:name',(req,res)=>{
     
    if(!gfss){
         console.log('No gfs bucket due to internet connectivity')
    }
    else{
     gfss.files.findOne({filename:req.params.name},(err,file)=>{
         
          if(err){
               res.status(500).send(err)
          } 
          else{
               if(!file || file.length===0){
                    //res.status(404).json(({err:'file not found'}))
                    console.log('file not found')
               }
               else{
                    const readStream=gfss.createReadStream(file.filename)
                    readStream.pipe(res)
               }
          }
     })
    }
     
})
//Routes: upload shared image Routes: upload shared image Routes: upload shared image
app.post('/api/newpostimg',upload.single('file'),(req,res)=>{
     const userId=req.body.userId;
     const desc=req.body.desc;
     const img=req.file.filename;
     console.log('img',img)
     const newPost=new Post({userId,desc,img})
     newPost.save()  
     .then(response=>{
             res.status(200).json(response)
     })
     .catch(err=>{
          res.status(500).json(err)
     })
})
//Rouets:upload Cover image

app.put('/api/coverImage/:id',upload.single('coverPicture'),(req,res)=>{
    
         const img=req.file.filename;
     if(req.params.id !=='' || req.body.isAdmin){
        
          User.findByIdAndUpdate(req.params.id,{
               $set:{coverPicture:img},
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
app.put('/api/profileImage/:id',upload.single('profilePicture'),(req,res)=>{
    
     const img=req.file.filename;
 if(req.params.id !=='' || req.body.isAdmin){
    
      User.findByIdAndUpdate(req.params.id,{
           $set:{profilePicture:img},
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

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoutes)
app.get('/working',(req,res)=>{
     res.send('hey back end is running sucessfully')
})

//mongoose connection 
//mongoose.Promise=global.Promise

app.use('/images',express.static(path.join(__dirname,'public/images')))

app.listen(port,()=>{
  console.log('backend is running by port',port);
  


})
