import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true)
          setName(res.data.name)


        } else {
          setAuth(false)
          setMessage(res.data.Error)
        }
      })
      .then(err => console.log(err));
  }, [])

  const handleDelete = () => {
    axios.get('http://localhost:8000/logout')
      .then(res => {
        window.location.reload(true);


      }).catch(err => console.log(err));
  }


  return (

    <div className='  custom3-bg '>
      {
        auth ?
          <div >
            <h3 className=' padding'>You are Atuthorized----- {name}</h3>
            <div className='padding1'>
              <button className='btn btn-danger ' onClick={handleDelete}>Logout</button>
            </div>
          </div>
          :
          <div>
            <h3 className=' padding'>{message}</h3>
            <h3 className='padding1'>Login Now</h3>
            <div className='padding1'>
              <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
          </div>

      }

    </div>
  )
}

export default Home
