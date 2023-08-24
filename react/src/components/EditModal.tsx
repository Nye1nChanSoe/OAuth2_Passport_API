import React, { useRef, useEffect, useState } from 'react';
import { User, RegisterPayload } from '../types';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  editRecord: (id: string, payload: RegisterPayload) => Promise<void>,
  _user: User,
}


const EditModal: React.FC<Props> = ({ setShow, editRecord, _user }) => {
  const [user, setUser] = useState<User>(_user);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfRef = useRef<HTMLInputElement | null>(null);

  // Close modal when press escape
  useEffect(() => {
    const handleCloseOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false);
      }
    };
    window.addEventListener('keydown', handleCloseOnEscape);
    return () => {
      window.removeEventListener('keydown', handleCloseOnEscape);
    };
  }, [setShow]);

  const handleClick = async () => {
    let payload: RegisterPayload;

    if(passwordRef?.current?.value) {
      payload = {
        name: user.name,
        email: user.email,
        password: passwordRef?.current?.value,
        password_confirmation: passwordConfRef?.current?.value,
      }
    }
    else {
      payload = {
        name: user.name,
        email: user.email,
      }
    }

    setShow(false);
    editRecord(user.id, payload);
  }


  return (
    <td className="relative">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className='mb-6 flex justify-center relative'>
            <h1 className='text-lg'>Edit { user.name }</h1>
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Employee Name</label>
            <input
              onChange={ (e) => {setUser({ ...user, name: e.target.value })} }
              type="text"
              value={ user.name }
              placeholder="Enter Name..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Employee Email</label>
            <input
               onChange={ (e) => {setUser({ ...user, email: e.target.value })} }
              type="email"
              value={ user.email }
              placeholder="Enter Email..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Password (optional)</label>
            <input
              ref={ passwordRef }
              type="password"
              placeholder="Enter Password..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Passowrd Confirmation (optional)</label>
            <input
              ref={ passwordConfRef }
              type="password"
              placeholder="Confirm Password..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <button
            onClick={ handleClick }
            type="button"
            className="w-full text-center bg-blue-600 p-1.5 rounded-lg text-sm text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </td>
  );
};

export default EditModal;