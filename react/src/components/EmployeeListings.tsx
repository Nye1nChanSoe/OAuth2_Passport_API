import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { RegisterPayload, User } from '../types';
import { AxiosError } from 'axios';
import Error from './Error';
import { axiosClient } from '../axios-client';
import EmployeeRecord from './EmployeeRecord';
import CreateModal from './CreateModal';

interface ReadResponse {
  data: {
    data: User[],
  },
}

interface PostEditResponse {
  data: {
    data: User,
  },
}

interface CustomErrorResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}


const EmployeeListings: React.FC = () => {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ show, setShow ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get<unknown, ReadResponse>('/users');
        setUsers(res.data.data);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    };

    fetchUsers();
  }, [])

  const handleCreate = async (payload: RegisterPayload) => {
    try {
      setShow(false);
      const res = await axiosClient.post<unknown, PostEditResponse>('/users', payload);
      setUsers([res.data.data, ...users]);
    }
    catch (error) {
      const err = error as AxiosError;
        setError((err.response?.data as CustomErrorResponse)['message'])
        setTimeout(() => {
          setError(undefined);
        }, 5000);
    }
  }

  const handleEdit = async (id: string, payload: RegisterPayload) => {
    try {
      console.log(payload);
      const res = await axiosClient.put<unknown, PostEditResponse>(`/users/${id}`, payload);
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex] = res.data.data;
        setUsers(updatedUsers);
      }
    } catch (error) {
      const err = error as AxiosError;
      setError((err.response?.data as CustomErrorResponse)['message'])
      setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure?')) {
      try {
        await axiosClient.delete(`/users/${id}`);
        setUsers(users.filter((user: User) => user.id !== id));
      }
      catch (error) {
        const err = error as AxiosError;
        setError((err.response?.data as CustomErrorResponse)['message'])
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    }
  }


  return (
    <div className='container mx-auto rounded'>
      <div className='flex items-center justify-between mb-8 p-4 bg-white shadow-sm rounded'>
        <h1 className='text-gray-600'>Employee Records</h1>
        <button
          onClick={ () => { setShow(() => !show) } }
          type='button'
          className='text-sm p-2 px-3.5 bg-gray-800 rounded-lg text-white hover:bg-gray-900'
        >
          { show ? 'Close' : 'Add Employee' }
        </button>
      </div>

      {
        show &&
        <CreateModal
          setShow={setShow}
          createRecord={handleCreate}
        />
      }

      <div className='bg-white shadow-sm p-4 rounded'>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Enrolled Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              users.map<JSX.Element>((user: User, index: number): JSX.Element => (
                <EmployeeRecord
                  key={ index }
                  user={ user }
                  editRecord={ handleEdit }
                  deleteRecord={ handleDelete }
                />
              ))
            }
          </tbody>
        </table>
      </div>
      {
        error && <Error message={ error } />
      }
    </div>
  )
}

export default EmployeeListings;