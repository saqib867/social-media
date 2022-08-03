import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './register.css'
import { Link } from 'react-router-dom'
import { registerLogin } from '../../reducerFolder/action'
import { httpLink } from '../../Gethttp'



function Register(){

     const[name, setUserName]=useState("")
     const[email, setEmail]=useState('')
     const[password,setPassword]=useState('')
     const[passwordAgain,setPasswordAgain]=useState('')
     const[isLogin,setIsLogin]=useState(false)
     const[error,setError]=useState('')
     //const httpLink=process.env.REACT_APP_PUBLIC_FOLDER

const signup=(e)=>{
     e.preventDefault()
     
     if(name===''){
        setError('Name is required')
     }
     else if(email===''){
        setError('Email is required')
     }
     else if(password.length<6){
       setError('Password length must be greater than 6')
     }
     else if(password!==passwordAgain){
       setError('Password does not matched')
     }
       else{
          const formData={
               name,
               email,
               password
          }
          axios.post(`${httpLink}/api/auth/register`,formData)
          .then(response=>{
               
               console.log('registred response',response.data)
            if(response.data){
                 setIsLogin(true)
                 localStorage.setItem('user',JSON.stringify(response.data._id))
                 window.location.reload()
                 
                }
                else if(!response.data){
                     
                     setError('User is already Registered')
                }
              
          })
          .catch(err=>console.log('Err occured while signing up...',err))
          setIsLogin(false)
       } 
       
}     


     return(
          <>
          <div className="login">

               <div className="loginWrapper">
                    <div className="loginLeft">
                         <h3 className='loginLogo'>INTERWORLD</h3>
                         <div className="loginDesc">
                              Connect with friends and faimly and enjoy the world
                         </div>
                    </div>
                    <div className="loginRight">
                         <div className="loginBox">
                              {error}
                              <input type="text" className="loginInput" placeholder='User Name' 
                              onChange={(e)=>setUserName(e.target.value)}
                              />
                              <input type="email" className="loginInput" placeholder='Email'
                              onChange={(e)=>setEmail(e.target.value)}
                              />
                              <input type="password" className="loginInput" placeholder='Passwrod' 
                              onChange={(e)=>setPassword(e.target.value)}
                              />
                              <input type="password" className="loginInput" placeholder='Password Again'
                               onChange={(e)=>setPasswordAgain(e.target.value)}
                              />
                              <button className="loginButton"
                              onClick={signup}
                              >{isLogin?"Loading...":"Sign Up"}</button>
                              <button className="loginSignup"><Link to='/login'>Login</Link></button>
                              
                         </div>
                    </div>
               </div>
          </div>
             
          </>
     )
}
const mapStateToProps=(state)=>{

     console.log('register state',state)
     return{

     }
}

export default connect(mapStateToProps,{registerLogin})(Register)