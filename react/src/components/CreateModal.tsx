import React, { useRef, useEffect } from 'react';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  createRecord: (payload: RegisterPayload) => Promise<void>,
}


interface RegisterPayload {
  name: string | undefined,
  email: string | undefined,
  password: string | undefined,
  password_confirmation: string | undefined,
}


const CreateModal: React.FC<Props> = ({ setShow, createRecord }) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
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

  const handleClick = () => {
    const payload: RegisterPayload = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      password_confirmation: passwordConfRef?.current?.value,
    }

    createRecord(payload);
  }


  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className='mb-6 flex justify-center relative'>
            <h1 className='text-lg'>Create Employee</h1>
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Employee Name</label>
            <input
              ref={ nameRef }
              type="text"
              placeholder="Enter Name..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Employee Email</label>
            <input
              ref={ emailRef }
              type="email"
              placeholder="Enter Email..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Password</label>
            <input
              ref={ passwordRef }
              type="password"
              placeholder="Enter Password..."
              className="w-full p-1.5 border rounded-lg focus:outline-none focus:border focus:border-blue-400"
            />
          </div>
          <div className="text-sm text-gray-700 space-y-1.5">
            <label htmlFor="">Passowrd Confirmation</label>
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
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;