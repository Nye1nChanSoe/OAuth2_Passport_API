import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const HomeLayout: React.FC = () => {
  const { token } = useAuthContext();

  if(!token)
    return <Navigate to="/login" />

  return (
    <main>
      <Outlet />
    </main>
  );
}

export default HomeLayout;