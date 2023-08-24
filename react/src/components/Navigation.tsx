import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import Logout from './Logout';

const Navigation: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className='w-full h-20 bg-white px-10 py-4 shadow-sm'>
      <div className='w-full h-full flex items-center justify-end gap-x-8'>
        <div className='text-sm'>
          { user?.name }
        </div>
        <Logout />
      </div>
    </div>
  );
}

export default Navigation;