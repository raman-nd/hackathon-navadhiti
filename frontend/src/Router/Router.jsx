import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login/Login';
import { Root } from '../Pages/Root/Root';
import { SignUp } from '../Pages/Signup/Signup';
import { ViewApp } from '../Pages/View/ViewApp';
import { ViewScheme } from '../Pages/View/ViewScheme';
import { Add } from '../Pages/Add/Add';
import { Dashboard } from '../Pages/Dashboard/DashBoard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'add',
            element: <Add edit={false} />,
          },
          {
            path: 'edit',
            element: <Add edit={true} />,
          },
          {
            path: 'viewApp',
            element: <ViewApp />,
          },
          {
            path: 'viewScheme',
            element: <ViewScheme />,
          },
        ],
      },
    ],
  },
]);
