import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


const GuestLayout: React.FC = () => {
  const { token } = useAuthContext();

  if(token)
    return <Navigate to="/dashboard" />

  return (
    <main>
      <Outlet />
    </main>
  )
};

export default GuestLayout;