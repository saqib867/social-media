import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { httpLink } from '../../Gethttp'
import {postMessage} from '../../reducerFolder/action/index'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

function Feed({userId,currentUser,postMessage,postMessages,commentReducer}){
const[getPost,setGetPost]=useState(true)

//const httpLink=process.env.REACT_APP_PUBLIC_FOLDER


useEffect(()=>{
     const getMyposts=[]
      userId ? axios.get(`${httpLink}/api/posts/profile/`+userId)
     .then(response=>{
        
         postMessage(response.data?.sort((p1,p2)=>{
              return new Date(p2.createdAt )- new Date(p1.createdAt)
         }))
         
         
     })
       :axios.get(`${httpLink}/api/posts/timeline/`+currentUser?._id)
     .then(response=>{
          
          postMessage(response.data?.sort((p1,p2)=>{
               return new Date(p2.createdAt) - new Date(p1.createdAt)
          }))
          
     })  
     console.log('reducer ',postMessages)
    
      
},[userId,currentUser,commentReducer])



     return(

          <div className="feed">
               
               <div className="feedWrapper">
                   {(!userId|| currentUser?._id===userId) && <Share/>}
                    {postMessages.map((myPost,index)=>{
                         return(
                              <Post key={index} posts={myPost} />
                         )
                    })}
                    
               </div>
          </div>
     )
}
const mapStateToProps=(state)=>{
     console.log('feed state',state)
     return{
          currentUser:state.userCred,
          postMessages:state.postMessages,
          commentReducer:state.commentReducer
     }
}
export default connect(mapStateToProps,{postMessage})(Feed)