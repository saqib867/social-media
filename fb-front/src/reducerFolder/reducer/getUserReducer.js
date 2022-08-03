
export const searchReducer=(state=[],action)=>{
     let searchUser=[]
     switch(action.type){

          case "SEARCH_USER":
               searchUser=action.getSearch
               return searchUser
          default:
               
               return state
     }
}
