import { Navigate, createBrowserRouter, RouteObject } from 'react-router-dom';

import ErrorPage from './routes/children/ErrorPage';
import HomeLayout from './routes/HomeLayout';
import Dashboard from './routes/children/Dashboard';
import GuestLayout from './routes/GuestLayout';
import Login from './routes/children/Login';
import Register from './routes/children/Register';


// Authenticated users will route to this object
const homeRoute: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ],
};

// Unauthenticated users will route to this object
const guestRoute: RouteObject = {
  path: "/",
  element: <GuestLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element: <Navigate to='/login' />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ],
};


const router = createBrowserRouter([
  homeRoute,
  guestRoute,
]);

export default router;