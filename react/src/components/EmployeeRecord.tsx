import React, { useState } from "react";
import { RegisterPayload, User } from '../types';
import EditModal from "./EditModal";
import { formatDatetimeToYYYYMMDD } from "../helper";

interface Props {
  user: User,
  editRecord: (id: string, payload: RegisterPayload) => Promise<void>,
  deleteRecord: (id: string) => Promise<void>,
}


const EmployeeRecord: React.FC<Props> = ({ user, editRecord, deleteRecord }) => {
  const [ show, setShow ] = useState<boolean>(false);

  return (
    <tr className='hover:bg-slate-50 cursor-pointer'>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        { user.name }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        { user.email }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        { formatDatetimeToYYYYMMDD((user.created_at).toLocaleString()) }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className='space-x-4'>
          <a
            onClick={ () => setShow(true) }
            className="text-blue-600 hover:text-blue-800"
          >
              Edit
          </a>
          <a
            onClick={ () => deleteRecord(user.id) }
            className="text-red-500 hover:text-red-700"
          >
              Delete
          </a>
        </div>
      </td>
      {
        show &&
        <EditModal
          setShow={setShow}
          _user={user}
          editRecord={editRecord}
        />
      }
    </tr>
  );
};

export default EmployeeRecord;