import { useState } from 'react'
import './topbar.css'
import logo512 from '../components/logo512.png';
import noAvatar from '../noAvatar.png'
import {Link,useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getSearchUser } from '../reducerFolder/action';
import axios from 'axios';
import { GetLink, httpLink } from '../Gethttp';
function Topbar(props){

const[getUserResponse,setGetUserResponse]=useState({})
const[search,setSearch]=useState('')
const navigate=useNavigate()
//const httpLink=process.env.REACT_APP_PUBLIC_FOLDER

useEffect(()=>{

      axios.get(`${httpLink}/api/user?userId=${props.currentUser?._id}`)
      .then((response)=>{

               setGetUserResponse(response.data)
               console.log('props.state',props)
      })
},[props.currentUser])

const searchButton=(e)=>{
     e.preventDefault()
    if(search!==''){ 
     axios.get(`${httpLink}/api/user/search?search=${search}`)
     .then(response=>{
          console.log('search response',response.data)
          props.getSearchUser(response.data)
     })
     setSearch('')
     navigate('/search')
}
}
     return(

          <div className='topbarContainer'>
               <div className="topbarLeft">
                 <div className='topbarleft__logo'>
                      <span ><Link className="logo" to='/'>S</Link></span></div>
                 <div className="searchbar">
                       <div className="bi bi-search searchIcon"  onClick={searchButton} ></div>  
                       <input type="text" placeholder='search people...' value={search}
                       onChange={(e)=>setSearch(e.target.value)}
                       className='searchInput'
                       />
                    </div>
               </div>
               <div className="topbarCenter">
               <div className="topbarLinks">
                       <div className="topbarLink--active topbarLink">
                            <Link  className="topbarLink" to='/'>
                         <div className="bi bi-house-door"/>
                         </Link></div>
                       <div className="topbarLink">
                            <Link to='/suggestion' className='topbarLink'>
                            <div className="bi bi-people"/>  
                            </Link></div>
                            <div className="topbarLink">
                            <Link to='/' className='topbarLink'>
                            <div className="bi bi-tv"/>  
                            </Link></div>
                            <div className="topbarLink">
                            <Link to='/' className='topbarLink'>
                            <div className="bi bi-shop-window"/>  
                            </Link></div>

                </div>
               </div>
               <div className="topbarRight">
                     
                     <div className="topbarIcons">
                          <div className="topbarIconsItem">
                               <span className="topbarIconPpt bi bi-person-circle"/>
                               <span className='topbarIconBadge'>5</span>
                          </div>
                          <div className="topbarIconsItem">
                               <span className='topbarIconPpt bi bi-chat-left-text'></span>
                               <span className="topbarIconBadge">12</span>
                          </div>
                          <div className="topbarIconsItem">
                               <span className='topbarIconPpt bi bi-bell'></span>
                               <span className="topbarIconBadge">9</span>
                          </div>
                     </div>
                    <div className="topbarImg">
                         <Link to={`/profile/${getUserResponse?.email}`}>
               
                          <img className='topImg' alt={getUserResponse?.name}
                          src={!getUserResponse.profilePicture||getUserResponse.profilePicture==='' ?noAvatar:`${httpLink}/retrive/images/${getUserResponse?.profilePicture}`}/>
                          </Link>
                    </div>

               </div>


          </div>
     )
}
const mapStateToProps=(state)=>{
   
     return{
          currentUser:state.userCred,
          
     }
}
export default connect(mapStateToProps,{getSearchUser})(Topbar);