import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom'


import './Signup.css';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory()


  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      history.push('/')
    }
  }, [])

  const onSubmit = (data) => {

    const email = data.email
    const password = data.password
    const username = data.username
    const phone = data.phone
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          history.push('/login')
        })
      })
    })



  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>


        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            name='username'
            placeholder='username'
            {...register('username', { required: true })}
            id="fname"

          />
          {
            errors.username && (
              <p style={{ color: 'red' }}>Username is required
              </p>
            )
          }

          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            {...register('email', { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
            id="fname"
            name="email"
            placeholder='email'
          />
          {
            errors.email && (
              <p style={{ color: 'red' }}>Enter a valid Email Id
              </p>
            )
          }
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
            id="lname"
            name="phone"
          />
          {
            errors.phone && (
              <p style={{ color: 'red' }}>Enter valid phone number
              </p>
            )
          }
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register('password', { required: true, minLength: 5 })}
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
          <button>Signup</button>
        </form>

        <Link to={'/login'}><a>Login</a></Link>
      </div>
    </div>
  );
}
