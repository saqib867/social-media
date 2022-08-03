
export const commentReducer=(state=[], action)=>{

     let postComments=[]
     switch (action.type) {
          
          case 'POST_COMMENT':
               postComments=[...state,action.postComments]
               return postComments

          default:
               return state
               
     }
}