import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
  {
    path: "/dashboard",
    lebal: <div>user dashboard</div>,
  },
  {
    path: "/dashboard/orders",
    lebal: <div>orders</div>,
  },
  {
    path: "/dashboard/payments",
    lebal: <div>payments</div>,
  },
  {
    path: "/dashboard/profile",
    lebal: <div>profile</div>,
  },
  {
    path: "/dashboard/reviews",
    lebal: <div>reviews</div>,
  },
];



const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      
     
      dispatch(logout())
      navigate("/");
      
     
    } catch (error) {
      console.log("failed to log out" , error)
    }
    
  }
  return (
      <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col'>
          <div className='gap-8'>
              <div className='nav__logo'>
                  <Link to='/'>Ethio Lebaba <span>.</span></Link>

                  <p className='text-xs italic'> user dashboard</p>
              </div>
              <hr className='mt-5' />
              
              <ul className='space-y-5 pt-5 '>
                  {
                      navItems.map((item) => 
                          <li key={item.path}>
                          <NavLink className={({ isActive }) => isActive ? "text-blue-500 text-bold" : "text-black"} end to={item.path}>{item.lebal}</NavLink>
                          
                          </li>
                      )
                  }
              </ul>
      </div> 
      <div className='mb-3 space-y-5'>
        <hr mb-8 />
        <button className='text-white bg-primary py-1 rounded-sm font-medium px-5 hover:bg-blue-500' onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default UserDashboard