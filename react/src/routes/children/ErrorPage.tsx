import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

interface ErrorObject {
  error: {
    message: string;
  };
  status: number;
  statusText: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorObject;
  const navigate = useNavigate();

  return (
    <div className='h-screen flex items-center justify-center p-10'>
      <div className='text-center space-y-2'>
        <span>Woops!</span>
        <p className='text-red-500'>
          {
            error.error.message
          }
        </p>
        <div className='text-gray-500'>
          <span>{ error.status } | </span>
          <span>{ error.statusText }</span>
        </div>
        <div>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='text-blue-500 hover:text-blue-600'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;