import React, { useState } from "react";
import { RegisterPayload, User } from '../types';
import EditModal from "./EditModal";
import { formatDatetimeToYYYYMMDD } from "../helper";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  emp: User,
  editRecord: (id: string, payload: RegisterPayload) => Promise<void>,
  deleteRecord: (id: string) => Promise<void>,
}


const EmployeeRecord: React.FC<Props> = ({ emp, editRecord, deleteRecord }) => {
  const { user } = useAuthContext();
  const [ show, setShow ] = useState<boolean>(false);

  return (
    <tr className='hover:bg-slate-50 cursor-pointer'>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        { emp.name }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        { emp.email }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        { formatDatetimeToYYYYMMDD((emp.created_at).toLocaleString()) }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {
          user?.role === 'user'
          ? <div className='space-x-4'>
              <a
                onClick={ () => setShow(true) }
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </a>
              <a
                onClick={ () => deleteRecord(emp.id) }
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </a>
            </div>
          : <div className='space-x-4'>
              <div className="inline text-gray-400">
                Edit
              </div>
              <div className="inline text-gray-400">
                Delete
              </div>
            </div>
        }
      </td>
      {
        show &&
        <EditModal
          setShow={setShow}
          _user={emp}
          editRecord={editRecord}
        />
      }
    </tr>
  );
};

export default EmployeeRecord;