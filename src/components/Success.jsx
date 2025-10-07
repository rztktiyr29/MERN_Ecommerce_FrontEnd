import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";

const Success = () => {
  const { sessionId } = useParams();
  const { url, clearCart, user } = useContext(AppContext);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${url}/payment/success/${sessionId}`);
        setPayment(response.data);

        // Clear cart if user exists
        if (user) clearCart();
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payment details. Please try again.");
      }
    };
    fetchPayment();
  }, [sessionId, url]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!payment) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-900 min-h-screen flex mt-10 items-center justify-center p-4">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg max-w-3xl w-full p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">✅ Order Confirmed</h2>
          <p className="text-gray-300">Thank you for your purchase!</p>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded space-y-2">
            <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
            <p><strong>Order ID:</strong> {payment.orderId}</p>
            <p><strong>Payment ID:</strong> {payment.paymentId}</p>
            <p><strong>Status:</strong> {payment.status}</p>
            <p><strong>Amount:</strong> ₹{payment.amount}</p>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-700 p-4 rounded space-y-2">
            <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
            <p>{payment.userShipping.fullName}</p>
            <p>{payment.userShipping.street}</p>
            <p>{payment.userShipping.city}, {payment.userShipping.state} {payment.userShipping.zip}</p>
            <p>{payment.userShipping.pincode}</p>
            <p>{payment.userShipping.country}</p>

          </div>
        </div>

        {/* Order Items */}
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Order Items</h3>
          <div className="divide-y divide-gray-600">
            {payment.cartItems.map(item => (
              <div key={item._id} className="flex justify-between py-2">
                <p>{item.title} x {item.qty}</p>
                <p>₹{(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300">
          <p>We’ve sent a confirmation email with your order details.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
