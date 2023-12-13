
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
// uncomment these as components/pages are created
import Home from './components/z_pages/Home/Home.jsx';
import CreateTeam from './components/z_pages/CreateTeam/CreateTeam.jsx';
import MyTeamView from './components/z_pages/MyTeamView/MyTeamView.jsx';
// import Me from './components/z_pages/Me.jsx';
// import Profile from './components/z_pages/Profile.jsx';
// import NotFound from './components/z_pages/NotFound.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error here</h1>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/me',
        element: <MyTeamView />
      }, 
      // {
      //   path: '/profile/:id',
      //   element: <Profile />
      // }, 
      {
        path: '/create-team',
        element: <CreateTeam />
      }, 
      // {
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

