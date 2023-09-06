import React from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';
import './App.css'


function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/login')
        } else {
          alert("Error")
        }
      })
      .then(err => console.log(err));
  }
  return (
    <div className='d-flex justify-content-center align-items-center custom1-bg vh-100  ' >
      <div className='bg-white p-2 px-5 pb-5 rounded w-27'>
        <h2>Sign-Up</h2>

        <Form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor='name'><strong>Name</strong></label>
            <input type="text" placeholder="Enter name" name='name'
              onChange={e => setValues({ ...values, name: e.target.value })} className="form-control rounded" />

          </div>


          <div className="mb-3">
            <label htmlFor='email address'><strong>Email address</strong></label>
            <input type="email" placeholder="Enter email" name='email'
              onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded" autoComplete="current-password" />

          </div>

          <div className="mb-3">
            <label htmlFor='password'><strong>Password</strong></label>
            <input type="password" placeholder="Enter password" name='password'
              onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded" autoComplete="current-password" />

          </div>


          <button type="submit" className='btn btn-success w-100 rounded-0'>
            Sign up
          </button>
          <p>You are agree to our terms and policies</p>
          <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>

        </Form>
      </div>
    </div>
  )
}

export default Register









