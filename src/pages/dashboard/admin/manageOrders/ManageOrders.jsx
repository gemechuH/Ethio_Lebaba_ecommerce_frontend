import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/ordersApi";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";
import UpdateOrderModal from "./UpdateOrderModal";

const ManageOrders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    refetch();
  };

  const handleDeleteOder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete order:", err);
    }
  };

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;
const ordersList = Array.isArray(orders?.orders) ? orders.orders : [];
  return (
    <div className="section__container p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b">Order Id</th>
            <th className="py-3 px-4 border-b">Customer</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b gap-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order) => (
              <tr key={order._id}>
                <td className="py-3 px-4 border-b">{order._id || "N/A"}</td>
                <td className="py-3 px-4 border-b">{order.email || "N/A"}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status || "pending"}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  {formatDate(order.updatedAt)}
                </td>
                <td className="py-3 px-4 border-b flex items-center space-x-4">
                  <Link
                    to={`/dashboard/orders/${order._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <button
                    className="text-green-500 hover:underline"
                    onClick={() => handleEditOrder(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteOder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* update order modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

export default ManageOrders;
