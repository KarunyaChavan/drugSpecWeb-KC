import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import AuthLayout from './routes/Auth/Auth.jsx';
import Home from './routes/Home.jsx';
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/Auth' element={<AuthLayout />} />
      <Route index={true} path='/' element ={<Home />}/>
      </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
