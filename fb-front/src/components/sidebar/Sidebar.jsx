import './sidebar.css'
import logo512 from '../../components/logo512.png'
import { useState } from 'react'

function Sidebar(){

     const [friendImg,setFriendImg]=useState(logo512)
     return(

          <div className="sidebar">
             <div className='sidebarWrapper'>
                  <ul className='sidebarList'>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon bi bi-rss'></span>
                            <span className="sidebarListItemText">Feed</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-chat-left-quote'></span>
                            <span className="sidebarListItemText">Chat</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-camera-video'></span>
                            <span className="sidebarListItemText">Videos</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-bookmark'></span>
                            <span className="sidebarListItemText">Bookmark</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-question-circle'></span>
                            <span className="sidebarListItemText">Question</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-people'></span>
                            <span className="sidebarListItemText">Group</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-calendar-event'></span>
                            <span className="sidebarListItemText">Event</span>
                       </li>
                       <li className="sidebarListItem">
                            <span className='sidebarListItem__icon  bi bi-mortarboard'></span>
                            <span className="sidebarListItemText">Courses</span>
                       </li>
                       
                  </ul>
                  <button className="sidebarButton">
                       show more
                  </button>
                  <hr className='sidebarHr'/>
                  
                  
             </div>
               
          </div>
     )
}
export default Sidebar