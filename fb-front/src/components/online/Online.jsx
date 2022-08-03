import axios from 'axios'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { httpLink } from '../../Gethttp'
import noAvatar from '../../noAvatar.png'
import './online.css'
function Online(props){

 const[friendList,setFriendsList]=useState([])
 //const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
     useEffect(()=>{
          // let isMounted=true;
           
               axios.get(`${httpLink}/api/user/friends/`+props.currentUser?._id)
               .then(response=>{
                    const getFriendList=[]
                   
                    response.data.forEach(snap=>{
                         const{_id,name,email,profilePicture}=snap
                         getFriendList.push({_id,name,email,profilePicture})
                    })
                    setFriendsList(getFriendList)    
               })
               .catch(err=>console.log(err))

 },[])

     return(
     
               <li className='rightbarFriend'>
                          {friendList.map((friend,index)=>{
                     return(
                         <div className='rightbarFriendContainer'key={index}>
                               <div className='rightbarProfileImageContainer'>
                               
                               <img src={friend.profilePicture!==''?`${httpLink}/retrive/images/${friend?.profilePicture}`:noAvatar}
                               className='rightbarProfileImg'
                               />     
                              
                               <span className='rightbarOnlineIcon'></span>
                         </div>
                     <div className="rightbarOnlineFriend">{friend.name}</div>
                         </div>
                               )
                          })}
                          
               </li>
          
     )
}
const mapStateToProps=(state)=>{
    
     return{
          currentUser:state.userCred
}
}
export default connect(mapStateToProps,{})(Online)