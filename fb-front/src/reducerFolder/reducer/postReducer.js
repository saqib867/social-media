
export const postReducer=(state=[], action)=>{

     let postMessages=[]
     switch (action.type) {
          
          case 'SHARE_POST':
               postMessages=[...state,action.myPosts]
               return postMessages

          case 'POST_MESSAGE' :
               postMessages=action.myPosts;
               return postMessages
          
               
          default:
               return state
               
     }
}