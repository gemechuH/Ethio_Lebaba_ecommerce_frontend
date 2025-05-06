import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartSmallModel from "../pages/shop/CartSmallModel";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout, setUser } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);

  const { user } = useSelector((state) => {
    try {
      const storedUser = localStorage.getItem("user");
      return {
        user: state.auth.user || (storedUser ? JSON.parse(storedUser) : null),
      };
    } catch (error) {
      return { user: state.auth.user };
    }
  });

  useEffect(() => {
    if (user) {
      console.log("Current user:", {
        userName: user.userName,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg,
      });
    }
  }, [user]);

  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem("user");
      setDropdownopen(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const [isDropdownOpen, setDropdownopen] = useState(false);
  const handledropdownToggle = () => {
    setDropdownopen(!isDropdownOpen);
  };

  const adminDropDownMenus = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    { title: "Manage Products", path: "dashboard/manage-products" },
    { title: "All orders", path: "dashboard/manage-orders" },
    
    { title: "Add products", path: "dashboard/add-new-product" },
    { title: "all users", path: "dashboard/users" },
    { title: "logout", onClick: handleLogout },
  ];

  const userDropDownMenus = [
    {
      title: "Dashboard",
      path: "dashboard",
    },
    { title: "profile", path: "dashboard/profile" },
    { title: "payments", path: "dashboard/payments" },
    { title: "orders", path: "dashboard/orders" },
    { title: "logout", onClick: handleLogout },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  return (
    <header className="fixed-nav-bar fixed top-0 z-50  bg-slate-100 w-full">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="nav__logo link">
          <Link to="/">
            Ethio Lebaba<span>.</span>
          </Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handledropdownToggle}
                  src={user.profileImg || avatarImg}
                  alt={user.userName || "User"}
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <ul className="font-sans space-y-2">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          {menu.onClick ? (
                            <button
                              className="block w-1/5 text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={menu.onClick}
                            >
                              {menu.title}
                            </button>
                          ) : (
                            <Link
                              className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                              to={menu.path}
                              onClick={() => setDropdownopen(false)}
                            >
                              {menu.title}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>
      <div>
        {isCartOpen && (
          <CartSmallModel
            products={products}
            isOpen={isCartOpen}
            onClose={handleCartToggle}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
