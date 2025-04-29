import Auth from '@/pages/auth/auth'
import { SigninContainer } from '@/pages/auth/signin'
import { SignupContainer } from './pages/auth/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/Component/ProtectedRoute'
import Product from './components/Component/product'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='auth/signup' element={<Auth><SignupContainer/></Auth>}/>
        <Route path='auth/signin' element={<Auth><SigninContainer/></Auth>}/>
        <Route path='auth/product' element ={<ProtectedRoute><Product/></ProtectedRoute>}/>
       
    </Routes>
  )
}

export default AppRoutes
