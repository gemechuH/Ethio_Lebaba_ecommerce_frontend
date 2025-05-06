

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
   useEffect(() => {
     toast.info(
       <div>
         <h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>
           🎉 Welcome!
         </h4>
         <p>
           This site was built by <h3>Gemechu Hunduma</h3>
         </p>
         <p>Enjoy shopping 🛍️</p>
       </div>,
       {
         position: "top-center",
         autoClose: 5000, // milliseconds
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         icon: "🚀",
       }
     );
   }, []);

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        toastClassName="red-toast"
        limit={1}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default App
