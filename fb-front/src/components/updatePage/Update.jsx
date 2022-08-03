import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Topbar from '../Topbar';
import { updateProfile } from '../../reducerFolder/action';
import './update.css';
import { httpLink } from '../../Gethttp';

function Update(props) {
     
        const[desc,setDesc]=useState('')
        const[city,setCity]=useState('')
        const[from,setFrom]=useState('')
        const[education,setEducation]=useState('')
       // const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
const updateInfo=()=>{

     const formData={
          desc,
          city,
          from,
          education
     }

     axios.put(`${httpLink}/api/user/updateUser/${props.currentUser._id}`,formData)
     .then(response=>{
          
          props.updateProfile(response.data)
     })
}

     return(
          <>
          
          <Topbar/>
          <div className='update'>
          
           <div className='update__container'>
             <div className='update_info'>Profession</div>
                  <input type='text' placeholder={props.currentUser?.desc} onChange={(e)=>setDesc(e.target.value)}
                   className='update_input'/>
                  <div className='update_info'>Current Location:</div>
                  <input  placeholder={props.currentUser?.city} onChange={(e)=>setCity(e.target.value)}
                   className='update_input'/>
                  <div className='update_info'>Belong to: </div>
                  <input placeholder={props.currentUser?.from} onChange={(e)=>setFrom(e.target.value)}
                   className='update_input'/>
                  <div className='update_info'>Update your education:</div>
                  <input placeholder={props.currentUser?.education} onChange={(e)=>setEducation(e.target.value)}
                  className='update_input'/>
               <div className="update_button">
                    <Link to={`/profile/${props.currentUser?.email}`}>
                    <button className='btn btn-success' onClick={updateInfo}>Update</button></Link>
               </div>
               <div className="cancle_button">
                    
                    <button className='btn btn-danger'>Cancle</button>
               </div>
         
             </div>
          </div>
          </>
     ) 
}

const mapStateToProps=(state)=>{
     return{
          currentUser:state.userCred
     }
}

export default connect(mapStateToProps,{updateProfile})(Update)
