import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/Topbar'
import logo512 from '../../components/logo512.png'
import saqib from '../../saqib.PNG';
import noAvatar from '../../noAvatar.png'
import { userUpdate,registerLogin,updateProfile } from '../../reducerFolder/action';
import './profile.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { connect } from 'react-redux';
import { GetLink, httpLink } from '../../Gethttp';

function Profile(props){
   
const usernameParams=useParams().username
const [user,setUser]=useState([])
const[coverFile,setCoverFile]=useState(null)
const[profileFile,setProfileFile]=useState(null)
//const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
useEffect(()=>{

       axios.get(`${httpLink}/api/user?email=${usernameParams}`)
       .then(response=>{
           
         setUser(response.data)
        //props.userUpdate(response.data)
       })
},[props.current,usernameParams])


const uploadCover=(e)=>{

     e.preventDefault()
     const formData=new FormData()
   formData.append('coverPicture',coverFile)

   if(coverFile){
     axios.put(`${httpLink}/api/coverImage/${props.current?._id}`,formData)
     .then(response=>{
          
           props.userUpdate(response.data)
     })
   }
   else{
           console.log('Select a cover photo first')
   }
}

const uploadProfile=(e)=>{

     e.preventDefault()
     const formData=new FormData()
   formData.append('profilePicture',profileFile)

   if(profileFile){
     axios.put(`${httpLink}/api/profileImage/${props.current?._id}`,formData)
     .then(response=>{
          
          props.updateProfile(response.data)
         
     })
   }
   else{
      console.log('Select a photo for profile first')
   }
}

 return(
          <>
               <Topbar/>
               <div className='profile'> 
                <Sidebar/>
                <div className='profileRight'>
                     <div className='profileRightTop'>
                          <div className="profileCover">
                          
                          <img src={user?.coverPicture!==''?`${httpLink}/retrive/images/${user?.coverPicture}`:noAvatar}
                           className='profileCoverImg' />
                         <form> 
                         {props.current?.email===usernameParams &&
                       <>

                          <div  className='profileSelectCoverImage'>
                          <label htmlFor='file'>Select Cover Image</label>
                           <input type='file' name='coverPicture' style={{display:'none'}} id='file'
                             onChange={(e)=>setCoverFile(e.target.files[0])}/>
                          </div>
                          <div className='profileCoverUploadImage'>
                             <div onClick={uploadCover}>Upload Image</div>
                          </div>
                         </>}
                          

                          <img src={user?.profilePicture!==''?`${httpLink}/retrive/images/${user?.profilePicture}`:noAvatar} 
                          className='profileUserImg'/>
                          
                          {props.current?.email===usernameParams &&
                          <>
                          <div className='profileChangeButton'>
                               <label htmlFor='profileFile'>Select Image</label>
                               <input type='file' id='profileFile' style={{display:'none'}}
                                onChange={(e)=>setProfileFile(e.target.files[0])}/>
                          </div>
                              <div className='profileUpdateButton'>
                               <div onClick={uploadProfile}>Upload image</div>
                          </div>
                          </>}
                          </form>
                          </div>
                          <div className="profileInfo">
                                <div className="profileInfoName">{user.name}</div>
                                <div className="profileInfoDesc">{user.desc}</div>
                          </div>
                         
                     </div>
                     <div className='profileRightBottom'>
                     <Feed userId={user?._id}/>
                      <Rightbar user={user} userIds={user?._id}/>
                     </div>
                
                </div>
                
                </div>
          </>
     )
}

const mapStateToProps=(state)=>{
    
        return{
             current:state.userCred
}
}
export default connect(mapStateToProps,{userUpdate,registerLogin,updateProfile}) (Profile);