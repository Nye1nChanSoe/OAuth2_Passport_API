import React from 'react';
import Navigation from '../../components/Navigation';
import EmployeeListings from '../../components/EmployeeListings';

const Dashboard: React.FC = () => {
  return (
    <div className='space-y-10 h-screen bg-gray-50'>
      <Navigation />
      <EmployeeListings />
    </div>
  )
};

export default Dashboard;