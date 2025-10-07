import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const OrderHistory = () => {
  const { user, url ,token} = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) return;
        const res = await axios.get(
          `${url}/payment/allorder`,
          {
            headers: {
              "Content-Type": "Application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user, url]);

  if (loading) return <p className="text-center mt-4">Loading orders...</p>;
  if (!orders.length)
    return <p className="text-center mt-4">No orders placed yet.</p>;

  return (
    <div className="bg-gray-900 w-full h-screen mt-22">
      <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl text-white font-bold mb-4">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-gray-800 text-white rounded-2xl shadow-md p-5">
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <div>
                <h3 className="font-semibold text-lg">
                  Order ID: {order.orderId}
                </h3>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Status: {order.status}</p>
                <p className="font-semibold">Amount: ${order.amount}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {order.cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 border rounded-xl"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-600">
                      Price: ${item.price} × {item.qty}
                    </p>
                    <p className="font-semibold">
                      Total: ${item.price * item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OrderHistory;
