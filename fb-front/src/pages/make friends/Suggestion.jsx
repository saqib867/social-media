import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/Topbar';
import { httpLink } from '../../Gethttp';
import noAvatar from '../../noAvatar.png'
import './suggestion.css'

function Suggestion(props) {

     const[allUser,setAllUser]=useState([])
     const[followed,setFollowed]=useState(false)
    // const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
    
 useEffect(()=>{
      axios.get(`${httpLink}/api/user/allUser`)
      .then(response=>{
           
          const getUser=[]
           response.data.forEach(snap=>{
                
                if(!props.currentUser.followings?.includes(snap?._id)){
                    
                    getUser.push(snap)
                }
           })
           setAllUser(getUser)
      })
 },[props.currentUser])    

      



const followUser=(userId)=>{
      
     axios.put(`${httpLink}/api/user/follow/${userId}`,{userId:props.currentUser?._id})
     .then(response=>{
          console.log('follow rightbar',response.data)
          //setFollowed(response.data)
     })
     setFollowed(!followed)
 }
  return (
     <>
          <Topbar/>
          <div className='suggestion'>
          <Sidebar/>
               <div className='suggestion_container'>
                <div className='suggestion_header'>
                     <h4 className='suggestion_header_suggest'>Friends Suggestion</h4>
                </div>
                {allUser.map((user,index)=>{
                     return(
                          <div key={index}>
                         {props.currentUser?._id!==user?._id &&     
                         <div className="suggestion_box" >  
                         <img src={user?.profilePicture!==''?`${httpLink}/retrive/images/${user?.profilePicture}`:noAvatar}
                          className='suggestion_box_img'/>
                         <div className='suggestion_box_name'><h4>{user.name}</h4></div>
                         <div className='suggestion_box_button'>
                             <button className='btn btn-success'
                             onClick={()=>followUser(user?._id)}
                             >Follow</button>
                         </div>
                    </div>}
                    </div>
                     )
                })}

               </div>
          <Rightbar/>
          </div>
     </>
  );
}

const mapStateToProps=(state)=>{
     return{
          currentUser:state.userCred
     }
}
export default connect(mapStateToProps)(Suggestion);
