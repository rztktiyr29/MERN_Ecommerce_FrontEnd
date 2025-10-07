import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setTotalPrice(price);
    setTotalQty(qty);
  }, [cart]);

  return (
    <div className="mt-22 w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      {cart?.items?.length == 0 ? (
        <>
        <p className="text-white text-2xl mb-4 ">Cart is empty</p>
        
        <button 
        onClick={()=> navigate('/')}
        className="text-xl py-2 px-4 rounded-lg text-white font-bold bg-amber-300 hover:cursor-pointer hover:bg-amber-200">Continue shopping....</button>
        </>
      ):(
<>
      <div className="flex items-center gap-16 my-6">
        <h1 className="bg-amber-400 text-xl font-bold px-4 py-2 rounded-lg text-white">
          Total Qty:{totalQty}
        </h1>
        <h1 className="bg-blue-400 text-xl font-bold px-4 py-2 rounded-lg text-white">
          Total price:{totalPrice}
        </h1>
      </div></>
      )}

      <div className="bg-gray-700 w-full max-w-7xl">
        <div className="grid grid-col-1 gap-8">
          {cart?.items?.map((product) => (
            <div
              className="bg-gray-800 flex justify-around items-center"
              key={product._id}
            >
              <img
                className="w-32 h-32 md:w-48 md:h-48 object-contain "
                src={product.imgSrc}
                alt={product.title}
              />
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white py-1">
                  {product.title}
                </h1>
                <h2 className="text-xl font-bold text-white py-1">
                  ${product.price/product.qty}
                </h2>
                <h2 className="text-xl font-bold text-white py-1">
                  Qty-{product.qty}
                </h2>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4 text-white  text-lg">
                <button
                  onClick={() => decreaseQty(product?.productId, 1)}
                  className="px-4 py-2 bg-amber-400 rounded-md hover:bg-amber-300 hover:cursor-pointer"
                >
                  Decrease(-){" "}
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    );
                  }}
                  className="px-4 py-2 bg-blue-400 rounded-md hover:bg-blue-300 hover:cursor-pointer"
                >
                  Increase(+)
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure to remove ?"))
                      removeFromCart(product?.productId);
                  }}
                  className="px-4 py-2 bg-red-400 rounded-md hover:bg-red-300 hover:cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {cart?.items?.length > 0 && (
        <div className="flex items-center gap-16 my-6 mb-10">
          <button 
          onClick={()=> navigate('/shipping')}
          className="bg-amber-400 text-xl font-bold px-4 py-2 rounded-lg text-white hover:cursor-pointer hover:bg-amber-300">
            Check Out
          </button>
          <button
            onClick={() => {
              if (confirm("Cart will be cleared")) 
                clearCart();
            }}
            className="bg-red-400 text-xl font-bold px-4 py-2 rounded-lg text-white hover:cursor-pointer hover:bg-red-300"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
