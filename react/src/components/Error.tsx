import React from 'react';

interface Props {
  message: string,
}

// Generic error component to render error messages
const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className='absolute top-10 left-1/2 -translate-x-1/2 z-10'>
      <div className='p-4 bg-red-500 rounded-xl'>
        <div className='w-full text-center text-white'>
          {message}
        </div>
      </div>
    </div>
  );
}

export default Error;