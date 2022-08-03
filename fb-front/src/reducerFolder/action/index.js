import axios from "axios"

// LogIn and Register action
export const registerLogin=(userCred)=>{
      
      const action={
           type:'LOGIN',
           userCred
      }
      console.log('log in action',userCred)
      return action
}

// Share post action
export const sharePost=(myPosts)=>{
      
         const action={
               type:"SHARE_POST",
               myPosts
         }
         return action
}

// Get post messages aciton
export const postMessage=(myPosts)=>{

      const action={
            type:'POST_MESSAGE',
            myPosts
      }
      console.log('post message action',action)
      return action
} 

//Update user Cover photo
export const userUpdate=(updateUser)=>{
      const action={
            type:'UPDATE_USER',
            updateUser
      }
      return action
}

//Update user Profile information
export const updateProfile=(updateUser)=>{
      const action={
            type:'UPDATE_PROFILE',
            updateUser
      }
      return action
}
export const getSearchUser=(getSearch)=>{
      const action={
            type:"SEARCH_USER",
            getSearch
      }
      console.log('search user -->>>',action)
      return action
}
export const postComment=(postComments)=>{
      const action={
            type:"POST_COMMENT",
            postComments
      }
      console.log('comment action -->>>',action)
      return action
}