import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/auth/signin')
    },[])
  return (
    <div className='flex flex-wrap'>
       This is the Home page
    </div>
  )
}

export default Home
