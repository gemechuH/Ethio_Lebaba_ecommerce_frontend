import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const {
    data, 
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);
  
  console.log(data);

  if (isLoading)
    return (
      <div>
        <ClimbingBoxLoader />
      </div>
    );
    if (error) return <div>no order found</div>;
  return (
    <div>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Your Orders
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ORDER ID
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      DATE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      STATUS
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      TOTAL
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      VIEW ORDER
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.orders.map((order, index) => (
                    <tr key={order.orderId}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {order.orderId}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-400">
                          <Link to={`/order/${order.orderId}`}>View Details</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Notus JS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default UserOrders;
