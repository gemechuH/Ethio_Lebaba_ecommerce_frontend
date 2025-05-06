import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/features/cart/CarSlice";
import { getBaseUrl } from "../utils/baseURL";
import { format } from "date-fns";

const OrderTimeline = ({ currentStatus, timestamps }) => {
  const statuses = ["pending", "processing", "shipped", "delivered"];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="my-8">
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(currentIndex + 1) * 25}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {statuses.map((status, index) => (
            <div key={status} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentIndex
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index <= currentIndex ? "✓" : ""}
              </div>
              <p className="mt-2 text-sm font-medium capitalize">{status}</p>
              {timestamps[status] && (
                <p className="text-xs text-gray-500">
                  {format(new Date(timestamps[status]), "MMM dd, HH:mm")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  const [orderStatus, setOrderStatus] = useState("processing");
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderTimestamps, setOrderTimestamps] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (sessionId) {
      confirmPayment(sessionId); // Confirm payment first
      dispatch(clearCart());
    }
  }, [location]);

  const confirmPayment = async (sessionId) => {
    try {
      const response = await fetch(
        `${getBaseUrl()}/api/orders/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm payment");
      }

      const data = await response.json();
      console.log("Confirm payment response:", data);

      // Fetch order status after confirming payment
      await fetchOrderStatus(sessionId);
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  const fetchOrderStatus = async (sessionId) => {
    try {
      const response = await fetch(
        `${getBaseUrl()}/api/orders/status/${sessionId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order status");
      }

      const data = await response.json();
      console.log("Order status response:", data);

      if (data.success) {
        setOrderStatus(data.status);
        setOrderDetails(data.order);
        setOrderTimestamps(data.timestamps);
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {orderDetails && (
          <>
            {/* Order Timeline */}
            <OrderTimeline
              currentStatus={orderStatus}
              timestamps={orderTimestamps}
            />

            {/* Customer Details */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <p className="font-medium">{user?._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user?.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(orderDetails.createdAt),
                      "MMM dd, yyyy HH:mm"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{orderDetails.ordersId}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 capitalize">
                    {orderStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium">
                    ${orderDetails.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Purchased Items */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Items Purchased
                </h4>
                <div className="space-y-4">
                  {orderDetails.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">
                            Product ID: {item.productId}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            View Orders
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
