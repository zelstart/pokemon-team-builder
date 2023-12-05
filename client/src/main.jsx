
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Test from './components/z_pages/TestPage/Test.jsx';
// uncomment these as components/pages are created
// import Home from '.components/z_pages/Home.jsx';
// import CreateTeam from './components/z_pages/CreateTeam.jsx';
// import Me from './components/z_pages/Me.jsx';
// import Profile from './components/z_pages/Profile.jsx';
// import TeamView from './components/z_pages/TeamView.jsx';
// import NotFound from './components/z_pages/NotFound.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
 //   errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Test />
      },
      // {
      //   path: '/me',
      //   element: <Me />
      // }, {
      //   path: '/profile/:id',
      //   element: <Profile />
      // }, {
      //   path: '/create-team',
      //   element: <CreateTeam />
      // }, {
      //   path: '/team/:id',
      //   element: <TeamView />
      // }, {
      //   path: '/test',
      //   element: <Test />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

);

