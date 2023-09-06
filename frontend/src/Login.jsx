import React from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './App.css'
function Login() {

  const [values, setValues] = useState({

    email: '',
    password: ''
  })
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/login', values)
      .then(res => {
        if (res.data.status === "Success") {
          navigate('/')
        } else {
          alert(res.data.Error);
        }
      })
      .then(err => console.log(err));
  }


  return (
    <div className='d-flex justify-content-center align-items-center custom-bg   vh-100  ' >
      <div className='bg-white p-2 px-5 pb-5 rounded w-27'>
        <h2>Sign-In</h2>

        <Form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor='email'><strong>Email address</strong></label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded"
              autoComplete="username" //  this is for autoComplete 
            />
          </div>

          <div className="mb-3">
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className='btn btn-success w-100 rounded-0'>
            Log in
          </button>
          <p>You are agree to our terms and policies</p>
          <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>

        </Form>
      </div>
    </div>
  )
}

export default Login





