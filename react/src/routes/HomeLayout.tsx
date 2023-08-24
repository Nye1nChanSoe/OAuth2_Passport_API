import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { axiosClient } from '../axios-client';
import { User } from '../types';
import { AxiosError } from 'axios';
import Error from '../components/Error';

interface ResponseData {
  data: {
    data: {
      user: User;
    }
  }
}


const HomeLayout: React.FC = () => {
  const { token, setUser } = useAuthContext();
  const [ error, setError ] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get<unknown, ResponseData>('/user');
        setUser(res.data.data.user);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    }

    if(token) {
      fetchUser();
    }
  }, [token, setUser]);


  // redirect the user to login page if the token is missing or user was logged out
  if(!token)
    return <Navigate to="/login" />

  return (
    <main>
      <Outlet />
      {
        error && <Error message={ error } /> 
      }
    </main>
  );
}

export default HomeLayout;