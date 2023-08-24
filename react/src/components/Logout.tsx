import React from 'react';
import { Navigate } from 'react-router-dom';
import { axiosClient } from '../axios-client';
import { useAuthContext } from '../context/AuthContext';

const Logout: React.FC = () => {
  const {token, setToken, setUser} = useAuthContext();

  if(!token)
    return <Navigate to='/login' />

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await axiosClient.post('/logout');
      setUser(null);
      setToken(null);
    } catch(error) {
      console.error('Error: ', error);
    }
  };


  return (
    <div>
      <a
        onClick={ (e: React.MouseEvent<HTMLAnchorElement>) => handleLogout(e) }
        className='cursor-pointer text-sm hover:text-blue-500'
      >
        Sign out
      </a>
    </div>
  );
};

export default Logout;