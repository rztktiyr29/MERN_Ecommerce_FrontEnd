import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user , clearCart } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (cart?.items) {
      cart.items.forEach(item => {
        qty += item.qty;
        price += item.price;
      });
    }
    setTotalPrice(price);
    setTotalQty(qty);
  }, [cart]);

  
  // const total = totalPrice;

  const handlePayment = async () => {
    if (!cart?.items?.length) return;

    setLoading(true);
    try {
      const response = await axios.post(`${url}/payment/checkout`, {
        cartItems: cart.items,
        userShipping: userAddress,
        userId: user._id,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl; // Redirect to Stripe
      clearCart()
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-22 bg-gray-900 w-screen h-screen">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
        {/* Shipping Address */}
        <div className="md:col-span-2 bg-gray-800 shadow rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-2 text-xl">
            <p><span className="font-semibold">Full Name:</span> {userAddress?.fullName}</p>
            <p><span className="font-semibold">Phone:</span> {userAddress?.phoneNumber}</p>
            <p><span className="font-semibold">Address:</span> {userAddress?.address}</p>
            <p><span className="font-semibold">City:</span> {userAddress?.city}</p>
            <p><span className="font-semibold">State:</span> {userAddress?.state}</p>
            <p><span className="font-semibold">Pincode:</span> {userAddress?.pincode}</p>
            <p><span className="font-semibold">Country:</span> {userAddress?.country}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 shadow rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="divide-y">
            {cart?.items?.map(product => (
              <div key={product._id} className="flex justify-between py-3">
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-white">Qty: {product.qty}</p>
                </div>
                <p>${(product.price).toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between py-3">
              <p className="font-medium">Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>

            {/* <div className="flex justify-between py-3">
              <p className="font-medium">Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div> */}

            <div className="flex justify-between py-3 font-semibold text-lg">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || !cart?.items?.length}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
