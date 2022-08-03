import { combineReducers } from "redux";
import {userReducer} from './userReducer'
import {postReducer} from './postReducer'
import {searchReducer} from "./getUserReducer";
import { commentReducer } from "./commentReducer";

export default combineReducers({

     userCred:userReducer,
     postMessages:postReducer,
     searchUser:searchReducer,
     commentReducer
})