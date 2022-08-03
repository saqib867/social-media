
let userCred=''
export const userReducer=(state=userCred,action)=>{

     switch (action.type) {
          case 'LOGIN':
               
               userCred=action.userCred
               return userCred

          case 'UPDATE_USER':
               
               userCred=action.updateUser;
               return userCred

          case 'UPDATE_PROFILE':
                    
               userCred=action.updateUser;
               return userCred
     
          default: 
               return state
     }
     
}