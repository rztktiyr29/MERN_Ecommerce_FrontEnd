import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products, isAuthenticated, isAdmin, addToCart } =
    useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products ]);

  return (
    <div>
      <h1 className="text-white text-3xl font-bold text-center sm:text-4xl mt-6 mb-12">
        Related Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
        {relatedProduct?.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 shadow-md rounded-lg p-4 flex flex-col h-full text-white "
          >
            <Link
              to={`/product/${product._id}`}
              className="flex-grow flex flex-col items-center"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-48 h-48 object-contain my-4"
              />
              <h2 className="text-lg font-semibold text-center">
                {product.title}
              </h2>
              <p className="text-gray-400">${product.price}</p>
            </Link>
            {isAuthenticated && !isAdmin && (
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
                className="mt-3 px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
