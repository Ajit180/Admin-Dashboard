import useAuthStore from '@/hooks/Store/useAuth'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user,token,isLoading,loadUserFromLocalStorage} =useAuthStore();

    useEffect(() => {
        loadUserFromLocalStorage(); // Load auth info from local storage when component mounts
      }, [loadUserFromLocalStorage]);
    
    if(isLoading){
        return<div>Loading..</div>
    }
    
    if (!user || !token) {
        return <Navigate to="/auth/signin" replace />; // Redirect to login if not authenticated
      }

    return children; 
}

export default ProtectedRoute
