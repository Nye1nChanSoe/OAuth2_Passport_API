import React from 'react';
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { AuthContextProvider } from './context/AuthContext';


const App: React.FC = () => {

  return (
    <AuthContextProvider>
      <RouterProvider router={ router } />
    </AuthContextProvider>
  )
}

export default App;
