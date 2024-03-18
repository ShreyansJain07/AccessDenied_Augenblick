import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatProvider } from './ChatContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/dashboard",
    element: <Dashboard />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatProvider>
    <RouterProvider router={router} />
  </ChatProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
