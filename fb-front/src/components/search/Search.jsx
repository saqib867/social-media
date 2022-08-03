import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { httpLink } from '../../Gethttp'
import Rightbar from '../rightbar/Rightbar'
import noAvatar from '../../noAvatar.png'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../Topbar'
import './search.css'

function Search(props) {
  return (
      <div className='search'>
           <Topbar/>
         <div className='search__container'>
         <Sidebar/>
              <div className='search__result'>
                
                 {props.searchedUser.map((user,index)=>{
                   return(
                    
                     <div key={index} className='search__map'>
                       <Link to={`/profile/${user?.email}`} className='search__link'>
                       <div className='search__result--item'>
                     <img src={!user.profilePicture?noAvatar:`${httpLink}/retrive/images/${user.profilePicture}`}
                     className='search__image'
                     />
                        <h3 className='search__name'>{user.name}</h3>
                        </div> 
                        </Link>     
                      </div>
                      
                   )
                 })}
              </div>  
         <Rightbar/>
         </div>
         
      </div>
  )
}
const mapStateToProps=(state)=>{
      return{
        searchedUser:state.searchUser
      }
}
export default connect(mapStateToProps,{})(Search)