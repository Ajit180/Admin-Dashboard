import Auth from '@/pages/auth/auth'
import Signin from '@/pages/auth/signin'
import { SignupContainer } from './pages/auth/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='auth/signup' element={<Auth><SignupContainer/></Auth>}/>
       
    </Routes>
  )
}

export default AppRoutes
