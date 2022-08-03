import './share.css'
import logo512 from '../../components/logo512.png'
import noAvatar from '../../noAvatar.png';
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { sharePost } from '../../reducerFolder/action';
import { GetLink, httpLink } from '../../Gethttp';
function Share(props){

     const[currentUser,setCurrentUser]=useState({})
     const[desc,setDesc]=useState('');
     const[file,setfile]=useState(null) 
     //const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
     
useEffect(()=>{
     
     axios.get(`${httpLink}/api/user?userId=${props.getMyUser?._id}`)
     .then((response)=>{

              console.log('setgetresponse',response.data)
              setCurrentUser(response.data)
     })
    
},[props.getMyUser])

const shareHandler=(e)=>{
      e.preventDefault()
   
      const newPost={
        userId:props.getMyUser._id,
        desc
      }

   if(file){
     const formData=new FormData()
     const fileName=Date.now()+file.name
     formData.append('userId',props.getMyUser._id)
     formData.append('desc',desc)
     formData.append('file',file) 
     
     axios.post(`${httpLink}/api/newpostimg`,formData)
     .then(response=>{
          props.sharePost(response.data)
          
     })

}
else{
     axios.post(`${httpLink}/api/posts/newpost`,newPost)
     .then((response)=>{
           props.sharePost(response.data)
           
     }) 
}
setfile(null)
setDesc("")
 
}
   return(
          <div className='share'>
               
               <div className='shareWrapper'>
                    <div className="shareTop">
                         <img src={!currentUser?.profilePicture?
                         noAvatar:`${httpLink}/retrive/images/${currentUser?.profilePicture}`} alt="" className="shareProfilePicture" />
                         <input type="text" className="shareInput" onChange={(e)=>setDesc(e.target.value)}
                         value={desc}
                          placeholder={`Say some thing ${props.getMyUser?.name}...`} />
                         
                    </div>
                    <hr className='shareHr'/>
                    {file && (
                         <div className='shareImgContainer'>
                         <div className="bi bi-x-circle-fill cancelImg" onClick={()=>setfile('')}/>
                         <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                         
                         <hr className='shareHr'/>
                         </div>
                    )}
                    
                    <form className="shareBottom">
                         <div className="shareOptions">
                              <label htmlFor='sharefile' className="shareOption">
                                   <span className='bi bi-images'/>
                                   <span className='shareOptionText'>photo</span>
                                   <span className='shareOptionText'>
                                   <input style={{display:'none'}} type='file' id='sharefile' name='file'
                                   onChange={(e)=>setfile(e.target.files[0])}
                                   /></span>
                              </label>
                              <div className="shareOption">
                                   <span className='bi bi-tag'/>
                                   <span className='shareOptionText'>Tag</span>
                              </div>
                              <div className="shareOption">
                                   <span className='bi bi-geo-alt'/>
                                   <span className='shareOptionText'>Location</span>
                              </div>
                              <div className="shareOption">
                                   <span className='bi bi-emoji-smile'/>
                                   <span className='shareOptionText'>Feeling</span>
                              </div>
                              <div className="shareOption">    
                                   <button className=' btn btn-success shareOptionText'
                                    id='shareButton' onClick={shareHandler}>Share</button>
                              </div>
                         </div>
                    </form>
               </div>

          </div>
     )
}
const mapStateToProps=(state)=>{
    
     return{
          getMyUser:state.userCred
     }
}
export default connect(mapStateToProps,{sharePost})(Share);