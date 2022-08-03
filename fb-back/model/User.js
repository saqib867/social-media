const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({

     name:{
         type:String,
         required:true,
         unique:false
         
     },  
     email:{
          type:String,
          unique:true,
          required:true,
          
     },
     password:{
          type:String,
          required:true,
          min:6
     },
     profilePicture:{
          type:String,
          default:""
     },
     coverPicture:{
          type:String,
          default:""
     },
     followers:{
          type:Array,
          default:[]
     },
     followings:{
           
          type:Array,
          default:[]
     },
     idAdmin:{
          type:Boolean,
          default:false
     }, 
     desc:{
          type:String,
          default:''
     },
     city:{
          type:String,
          default:''
     },
     from:{
          type:String,
          default:''
     },
     education:{
          type:String,
          default:''
     }  
},
{timestamps:true}
)
                
module.exports=mongoose.model('User',UserSchema);