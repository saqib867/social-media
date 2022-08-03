import './post.css';
import logo512 from '../../components/logo512.png';
import noAvatar from '../../noAvatar.png';
import { useEffect } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment } from '../../reducerFolder/action';
import { GetLink, httpLink } from '../../Gethttp';


function Post({posts,getCurrentUser,commentReducer,postComment}){

     const[user,setUser]=useState([])
     const[like,setLike]=useState(posts.likes.length)
     const[isLiked,setIsLiked]=useState(false)
     const[dsp,setDsp]=useState('none')
     const[commentText,setCommentText]=useState('')
     
     
    // const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
    

useEffect(()=>{

     axios.get(`${httpLink}/api/user?userId=${posts?.userId}`)
     .then(response=>{
          
          setUser(response.data)
          
     })
},[posts,getCurrentUser])




const likeHandler=()=>{
     
     axios.put(`${httpLink}/api/posts/like/${posts._id}`,{email:getCurrentUser?._id})
     .then((response)=>{
           response.data==='1' ? setLike(like+1):setLike(like-1)
          //setLike(isLiked ? like-1 : like+1);

          
     })
     setIsLiked(!isLiked)
     
}
const showComment=(id)=>{
      posts._id===id && setDsp('block')
      dsp==='block'?setDsp('none'): setDsp('block')
}
                                             
const submitComment=(postId,e)=>{
        
        
        const commentBody={
             userId:getCurrentUser._id,
             userName:getCurrentUser.name,
             email:getCurrentUser.email,
             commentText:commentText
        }
       axios.post(`${httpLink}/api/posts/comment/${postId}`,commentBody)
       .then(response=>{
            
            postComment(response.data)
               
       })
       
       setCommentText('')
      
}

     return(

          <div className='post'>
               <div className="postWrapper">
                    <div className="postTop">
                         <div className="postTopLeft">
                              <Link className='postUserLink' to={`/profile/${user?.email}`}>
                                  <img src={!user?.profilePicture?noAvatar:`${httpLink}/retrive/images/${user?.profilePicture}`}
                               alt="" className="postProfileImg"/>
                              <span className="postUserName">{user.name}</span>
                              </Link>
                              <span className="postDate">{format(posts.createdAt)}</span>
                         </div>
                         <div className="postTopRight">
                              <span className='three-dots'>...</span>
                         </div>
                    </div>
                    <div className="postCenter">
                         <div className="postText">{posts.desc}</div>
                         <img src={posts.img===''?"Loading Image":`${httpLink}/retrive/images/${posts?.img}`} alt="" className="postImage" />
                    </div>
                    <hr/>
                    <div className="postBottom">
                         <div className="postBottomLeft" onClick={likeHandler}>
                             
                              <span className='bi bi-hand-thumbs-up'/>
                              <span className="PostLikeCounter">{like}</span>
                         </div>
                         <div className="postBottomRight">
                              
                              <div className='postBottomRight_comment' onClick={()=>showComment(posts._id)}>
                              <span className='postBottomRight_length'>{posts.comments.length===0?'': posts.comments?.length}</span>
                               <span className='postBottomRight_text'>Comments</span>
                               <span className='postBottomRight_commentIcon bi bi-chat-left-text'></span>
                              </div>
                              
                              <div className="comment_input"  style={{display:dsp}}>
                              
                               <input type='text' className='comment_inputText' placeholder='comment...'
                               onChange={(e)=>setCommentText(e.target.value)}  value={commentText}
                               />
                               <div className='bi bi-send comment-input__button'onClick={(e)=>submitComment(posts._id,e)} />
                              
                              </div>
                          
                         </div>
                         
                    </div>
                   { dsp==='block' && 
                    <div className={posts.comments.length>4 ? "postBottom__comment":'postBottom_comment'} id='comm'>   
                             {
                              posts.comments.map((comment,index)=>{
                                    return(
                                    <div key={index} className='commentBody_items'>
                                      <div className='commentBody_username'>{comment?.userName}</div>
                                      <div className='commentBody_text'>{comment?.commentText}</div>     
                                   </div>
                                    )
                               })}           
                              </div> }
               </div>
               
          </div>
     )
}
const mapStateToProps=(state)=>{

     return{
          getCurrentUser:state.userCred,
          postMessages:state.postMessages,
          commnetReducer:state.commentReducer
          
     }
}
export default connect(mapStateToProps,{postComment}) (Post)