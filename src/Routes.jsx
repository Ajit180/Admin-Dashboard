import Auth from './pages/auth/Auth'
import { SigninContainer } from './pages/auth/Signin'
import { SignupContainer } from './pages/auth/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/Component/ProtectedRoute'
import AdminLayout from './components/Layout/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Orders from './pages/Admin/Orders'
import Categories from './pages/Admin/Categories'
import ProductContainer from './pages/Admin/Product/ProductContainer'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='auth/signup' element={<Auth><SignupContainer/></Auth>}/>
        <Route path='auth/signin' element={<Auth><SigninContainer/></Auth>}/>
        {/* <Route path='admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>} /> */}

      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path='admin/dashboard' element={<Dashboard />} />
        <Route path='admin/products' element={<ProductContainer/>} />
        <Route path='admin/orders' element={<Orders/>}/>
        <Route path='admin/category' element={<Categories/>}/>
      </Route>
       
    </Routes>
  )
}

export default AppRoutes
