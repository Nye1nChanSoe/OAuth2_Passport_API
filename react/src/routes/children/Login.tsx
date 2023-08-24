import React, { useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../axios-client';
import { useAuthContext } from '../../context/AuthContext';
import { AuthResponse } from '../../types';
import Error from '../../components/Error';

interface LoginPayload {
  email: string | undefined,
  password: string | undefined,
}


const Login: React.FC = () => {
  const { setUser, setToken } = useAuthContext();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload: LoginPayload = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    }

    try {
      setLoading(true);
      const res = await axiosClient.post<unknown, AuthResponse>('/login', payload);
      setUser(res.data.data.user);
      setToken(res.data.data.access_token);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
      setTimeout(() => {
        setError(undefined);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="w-96 p-2">
        <input
          ref={ emailRef }
          type="email"
          placeholder='Enter Email ...'
          className='w-full mb-4 py-2.5 px-4 rounded-full border-2 border-slate-300 text-gray-600 shadow-md focus:outline-none focus:border-2 focus:border-blue-400'
        />
        <input
          ref={ passwordRef }
          type="password"
          placeholder='Enter Password ...'
          className='w-full mb-6 py-2.5 px-4 rounded-full border-2 border-slate-300 text-gray-600 shadow-md focus:outline-none focus:border-2 focus:border-blue-400'
        />
        {
          !loading
          ? <button
              onClick={ handleClick }
              type='button'
              className='w-full mt-2 text-center bg-blue-400 text-white shadow-md px-4 py-2 rounded-full text-lg hover:bg-blue-500'
            >
              Sign in
            </button>
          : <button
              type='button'
              disabled={ true }
              className='w-full mt-2 text-center bg-gray-400 text-white shadow-md px-4 py-2 rounded-full text-lg'
            >
              Loading ...
            </button>
        }
        <div className='my-5 px-2'>
          <p className='text-center text-gray-500'>Don't have an account?
            <Link to='/register' className='ml-2 text-blue-500 hover:text-blue-600'>
              Register
            </Link>
          </p>
        </div>
      </div>
      {
        error && <Error message={error} />
      }
    </div>
  )
};

export default Login;