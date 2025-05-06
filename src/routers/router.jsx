import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/categoryLink/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetail/SingleProduct";
import Login from "../components/Login";

import PaymentSuccess from "../components/paymentSuccess";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/UserOrders";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddNewProduct from "../pages/dashboard/admin/addProduct/AddNewProduct";

import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import ManageUser from "../pages/dashboard/admin/manageUser/ManageUser";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserProfile from "../pages/dashboard/UserProfile";
import ManageProduct from "../pages/dashboard/admin/manageProduct/manageProduct";

const routerA = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <UserDMain />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "payments",
        element: <UserPayments/>,
      },
      {
        path: "profile",
        element: <UserProfile/>,
      },
      {
        path: "reviews",
        element: <div>reviews</div>,
      },

      //admin
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminDMain />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ManageProduct/>
            
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <ManageOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-product",
        element: (
          <PrivateRoute role="admin">
            <AddNewProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct/>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role="admin">
            <ManageUser />
          </PrivateRoute>
        ),
      },
    ],
  },
  // {
  //   path: '/register',
  //   element: <Register/>
  // }
]);

export default routerA;
