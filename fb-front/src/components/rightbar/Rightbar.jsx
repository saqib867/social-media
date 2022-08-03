import react from 'react'
import Online from '../online/Online'

import noAvatar from '../../noAvatar.png'
import './rightbar.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { httpLink } from '../../Gethttp';


function Rightbar(props){

let navigate=useNavigate()
const[friendsList,setFriendsList]=useState([])
const[followed,setFollowed]=useState(false)
//const httpLink=process.env.REACT_APP_PUBLIC_FOLDER

useEffect(()=>{
     setFollowed(props.currentUser?.followings?.includes(props.userIds))
     },[props.currentUser,props.userIds])

     useEffect(()=>{
          // let isMounted=true;
           
               axios.get(`${httpLink}/api/user/friends/`+props?.userIds)
               .then(response=>{
                    const getFriendList=[]
                   
                     response.data.forEach(snap=>{
                         const{_id,name,email,profilePicture}=snap
                         getFriendList.push({_id,name,email,profilePicture})
                    })
                    setFriendsList(getFriendList)    
               })
               .catch(err=>console.log(err))

 },[props.userIds,props.currentUser])
 //const removerLocal=()=>{
   //   localStorage.removeItem('user')
 //}

  const handleFollow=()=>{
          console.log('Right bar props',props.currentUser)
          if(followed){
               axios.put(`${httpLink}/user/unfollow/${props.userIds}`,{userId:props.currentUser?._id})
               .then(response=>{
                    console.log('ufollow rightbar',response.data)
                    //setFollowed(response.data)
               })
          }
          else{
               axios.put(`${httpLink}/api/user/follow/${props.userIds}`,{userId:props.currentUser?._id})
               .then(response=>{
                    console.log('follow rightbar',response.data)
                    //setFollowed(response.data)
               })
          }
          setFollowed(!followed)
     } 
const logout=()=>{

          localStorage.removeItem('user');
         // navigate('/login')
          window.location.reload()
}

const ProfileRightbar=()=>{


     return(
     <div className='proRightbar'>
     
     <div className="followUnfollow">
         {props.currentUser?._id!==props.userIds && (
              <button className='btn btn-primary' onClick={handleFollow}>
               {followed?'unfollow':'follow'}</button>
         )}
     </div>
     <h4 className='rightbarTitle'>User Information</h4>
     {props.currentUser?._id===props.userIds && 
     <Link to='/updateinfo'> <button className='btn btn-primary'
     >Update Profile</button></Link>}
     <div className="rightbarInfo">
          <div className="rightbarInfoItem">
               <div className="rightbarInfoKey">City:</div>
               <div className="rightbarInfoValue">{props.user.city}</div>
          </div>
          <div className="rightbarInfoItem">
               <div className="rightbarInfoKey">From:</div>
               <div className="rightbarInfoValue">{props.user.from}</div>
          </div>
          
          <div className="rightbarInfoItem">
               <div className="rightbarInfoKey">Education:</div>
               <div className="rightbarInfoValue">{props.user.education}</div>
          </div>
          
     </div>
     <div className="userFriends">
     <h3>Friends</h3>
          <div className="rightbarFollowings">
                
                    {friendsList.length===0?"No friends": friendsList.map(myFriends=>{
                         return(
                              
                              <div className="rightbarFollowing"  key={myFriends._id}>
                             <Link to={"/profile/"+myFriends.email} >
                              <img src={myFriends.profilePicture!==''?`${httpLink}/retrive/images/${myFriends?.profilePicture}`:noAvatar} alt="" className="rightbarFollowingImg" /></Link>
                              <span className='rightbarFollowingName'>{myFriends.name}</span>
                              
                             </div>
                         )
                    })
                     
               }
                             
          </div>
          {props.currentUser?._id===props?.userIds && 
           <button className='btn btn-danger logOutButton' onClick={logout}>Logout</button>}
          
     </div>
     </div>
     );

};
const HomeRightbar=()=>{


     return(
     <>
      <div className="rightbar">
               <div className="rightbarWrapper">
                    <div className="birthdayContainer">
                         <span className='bi bi-person-fill birthdayImg'/>
                         <span className='birthdayText'><b>Saqib</b> and <b>4 ohter</b> have birthday today with them!!</span>
                         
                    </div>
                    <hr className='rightbarHr'/>
                    <div className='RightbarBottom'>
                         <h4>Online friends</h4>
                         <ul className="rightbarFriendList">
                           <Online/> 
                           
                         </ul>
                         <div className='rightbarBottomLogout'>
                       

                    </div>
                    

                    </div>

               </div>
          </div>
     </>
     )
}

     return(

           
            <div className="rightbar">
               <div className="rightbarWrapper">
           {props.user?<ProfileRightbar/>:<HomeRightbar/>}
           </div>
          </div>
           
     )
}
const mapStateToProps=(state)=>{
     
     return{
          currentUser:state.userCred
     }
}

export default connect(mapStateToProps,{})(Rightbar)