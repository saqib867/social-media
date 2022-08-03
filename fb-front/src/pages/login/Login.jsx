import axios from 'axios';
import { useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerLogin } from '../../reducerFolder/action';
import { GetLink, httpLink } from '../../Gethttp';
import './login.css'


const strArr = ["X:-1", "Y:1", "X:-4", "B:3", "X:5"]
  const pairs = strArr.map(function(str) {
    return str.split(":");
  });
  
  const counts = {};
  for (let i = 0; i < pairs.length; i++) {
    if (counts[i]) {
      counts[pairs[i][0]] =counts[pairs[i][0]];
      parseInt(pairs[i][1]);
    }
  }
  console.log(counts)
  const returnArr = [];
  for (let key in counts) {
    if (counts[key] !== 0) {
      returnArr.push(`${key}:${counts[key]}`);
    }
  }
  console.log(returnArr)






 
 


function Login(){

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[err,setErr]=useState('')
  //const httpLink=process.env.REACT_APP_PUBLIC_FOLDER

const handleSubmit=(e)=>{
     e.preventDefault()
     const formData={
          email,
          password
     }
  
     axios.post(`${httpLink}/api/auth/login`,formData)
     .then(response=>{
          console.log('login',response.data)
          if(response.data===0){
               setErr('User could not be found')
          }
          else if(response.data===1){
               setErr('Wrong password')
          }
          else{
                 localStorage.setItem('user',JSON.stringify(response.data._id))
                
                 window.location.reload()
                 
          }
         
     })

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
                         <form className="loginBox" >
                              <div className='loginBoxErr'>{err}</div>
                              <input type="email" className="loginInput" placeholder='Email'
                               required onChange={(e)=>setEmail(e.target.value)}
                              />
                              <input type="password" required className="loginInput" placeholder='Password' 
                               onChange={(e)=>setPassword(e.target.value)}
                              />
                              <button className="loginButton" onClick={handleSubmit}
                              
                              >Login</button>
                              <button className="loginSignup"><Link to='/register' id='signup-btn'>Signup</Link></button>
                              
                         </form>
                    </div>
               </div>
          </div>
             
          </>
     )
}
const mapStateToProps = (state) => {

     return{
          state
     }
}
       

export default connect(mapStateToProps, {registerLogin})(Login);




