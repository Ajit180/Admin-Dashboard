import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
       This is the Home page 
       <button onClick={navigate('/auth/siginin')}>
          Sigin page
       </button>
    </div>
  )
}

export default Home
