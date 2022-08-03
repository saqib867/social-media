const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({

     userId:{
          type:String,
          required:true
     },
     desc:{
          type:String,
          default:''
     },
     img:{
          type:String,
          default:''
     },
     likes:{
          type:Array,
          default:[]
     },
     comments:{
          type:Array,
          default:[]
     }
   

},
  {timestamps:true} 
)
                
module.exports=mongoose.model('Posts',PostSchema);