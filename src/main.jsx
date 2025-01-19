import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import AuthLayout from './routes/Auth/Auth.jsx';
import Home from './routes/Home.jsx';
import { createBrowserRouter } from "react-router-dom";
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoute from './routes/Auth/PrivateRoute.jsx';
import Profile from './routes/Hcp/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/Auth' element={<AuthLayout />} />
      <Route index={true} path='/' element ={<Home />}/>
      <Route path='' element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
