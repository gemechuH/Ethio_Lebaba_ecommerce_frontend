import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routerA from './routers/router.jsx'
import "remixicon/fonts/remixicon.css";
import { Provider } from "react-redux";
import { store } from './redux/Store.js'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routerA} />
  </Provider>
);
