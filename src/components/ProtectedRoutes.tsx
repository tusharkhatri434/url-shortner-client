import React from 'react'
import { Navigate } from 'react-router-dom';

interface protectRouteProps {
   children: React.ReactNode;
}

const ProtectedRoutes : React.FC<protectRouteProps> = ({children}) => {
    
  const token = localStorage.getItem('token');

  if(!token){
    return <Navigate to={"/login"}  replace />
  }

  return children;
}

export default ProtectedRoutes