import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const{addToCart , url} = useContext(AppContext)
  const navigate = useNavigate()
  // const url = "http://localhost:3000/api";
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="bg-gray-900 mt-12 w-screen min-h-screen text-white flex flex-col items-center justify-center pb-34 overflow-x-hidden">
      <div className=" flex flex-col  justify-around gap-10 sm:flex-row sm:20 md:gap-30 px-8 mt-20">
        <div className="flex flex-col justify-center items-center">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="w-80 h-80 object-contain rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl font-bold sm:text-4xl ">{product?.title}</h1>
          <p className=" text-gray-300 text-center sm:text-xl">
            {product?.description}
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl ">${product?.price}</h2>
          <div className="flex gap-8 mt-8">
            <button 
            onClick={()=> navigate('/shipping')}
            className="bg-red-400 font-bold px-3 py-2 rounded-md hover:bg-red-500 hover: cursor-pointer">
              Buy Now
            </button>
            <button
              onClick={() => {
                addToCart(
                  product._id,
                  product.title,
                  product.price,
                  1,
                  product.imgSrc
                );
              }}
              className="bg-yellow-600 font-bold px-3 py-2 rounded-md hover: cursor-pointer hover:bg-yellow-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20 w-screen max-w-7xl px-8">
        <RelatedProduct category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetails;
