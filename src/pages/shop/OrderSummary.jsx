import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/CarSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utils/baseURL";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((store) => store.cart.products);
  console.log("Products in cart:", products); // Debug log
  console.log("Auth state:", { user });

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (store) => store.cart
  );

  const handleCheckout = async (e) => {
    try {
      console.log("Current user state:", user);
      console.log("Current products:", products);
      if (!user || !user.id || !user.email) {
        // Changed from user.id to user._id
        
        alert("Please log in to proceed to checkout.");
        navigate("/login");
        return;
      }

      if (!products || products.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

      // Format products data
      const formattedProducts = products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      }));

      const body = {
        products: formattedProducts,
        userId: user.id,
        email: user.email,
      };

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const response = await fetch(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const session = await response.json();

      if (!session.id) {
        throw new Error("No session ID received from server");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed: " + error.message);
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p>Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax: ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
        <div className="px-4 mb-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Clear Cart </span>
            <i className="ri-delete-bin-7-line"></i>
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Proceed to Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
