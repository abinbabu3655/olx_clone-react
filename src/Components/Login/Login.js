import React,{useState,useContext,useEffect} from 'react';
import { useForm } from 'react-hook-form'
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link, useHistory} from 'react-router-dom'
import swal from 'sweetalert';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {firebase} =useContext(FirebaseContext)
  const history= useHistory()
  const onSubmit = async (e)=>{
    const email=e.email
    const password=e.password
    await firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
      console.log(user)
      localStorage.setItem('token',user.user.Aa)
      console.log(user.user.Aa)
      history.push('/')
    }) 
    .catch((error)=>{
      swal(error.message)
    })
  }
  useEffect(() => {
  const token = localStorage.getItem('token')
  if(token){
    history.push('/')
  }
  }, [])

  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            {...register('email', { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
            id="fname"
            name="email"
          
          />
          {
            errors.email && (
              <p style={{ color: 'red' }}>Enter a valid Email Id
              </p>
            )
          }
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register('password', { required: true , minLength:5})}
            id="lname"
            name="password"   
          />
          {
            errors.password && (
              <p style={{ color: 'red' }}>Password must longer
              </p>
            )
          }
          <br />
          <br />
          <button>Login</button>
        </form>
        
        <Link to={'/signup'}><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
