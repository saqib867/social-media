import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import Update from "./components/updatePage/Update"
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import{Provider} from 'react-redux'
import { createStore } from "redux"
import reducer from './reducerFolder/reducer'
import axios from 'axios';
import { registerLogin } from './reducerFolder/action';
import {createBrowserHistory} from 'history'

import 'bootstrap'
import { useEffect } from "react"
import Suggestion from "./pages/make friends/Suggestion"
import { httpLink } from "./Gethttp.jsx"
import Search from "./components/search/Search"

const store=createStore(reducer)
//const httpLink=process.env.REACT_APP_PUBLIC_FOLDER
let navi=createBrowserHistory()
const currentUser=JSON.parse(localStorage.getItem('user'))
console.log('localhost',currentUser)
if(localStorage.getItem('user')){

     axios.get(`${httpLink}/api/user?userId=${currentUser}`)
     .then(response=>{
          console.log('app data',response.data)

          store.dispatch(registerLogin(response.data))
          //history.push('/')
          
     })
    
   // history.push('/')
   navi.push('/')
   
}
else{
     navi.replace('/login')
}


function App(){


  return(
     <Provider store={store}>
          <Router>
               <Routes>
                    
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register'element={<Register/>}/>
                    <Route path='/profile/:username' element={<Profile/>}/>
                    <Route path='/updateinfo' element={<Update/>}/>
                    <Route path='/suggestion' element={<Suggestion/>}/>
                    <Route path='/search'element={<Search/>}/>
                    <Route path='/' element={<Home/>} />
               </Routes>
              {/* 03009339832 */}
          </Router>
     </Provider>
          
     )
}
export default App