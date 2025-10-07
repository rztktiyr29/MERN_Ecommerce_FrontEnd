import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const SearchProduct = () => {
    const { term } = useParams()
    const { products } = useContext(AppContext)
    const [searchProduct, setSearchProduct] = useState([])

      useEffect(() => {
    if (term?.trim()) {
      setSearchProduct(
        products.filter((data) =>
          data?.title?.toLowerCase().includes(term.toLowerCase())|| data?.category?.toLowerCase().includes(term.toLowerCase())
        )
      )
    } else {
      setSearchProduct(products) // or show all products if preferred
    }
  }, [term, products])

return (
  <div className="min-h-screen bg-gray-900 flex justify-center px-4 sm:px-6 lg:px-8 mt-22 py-12">
    <div className="w-full max-w-7xl">

      {/* Case 1: No search term entered */}
      {!term?.trim() && (
        <p className="text-center text-gray-400 mb-6 text-lg">
          Please input a search term to find products.
        </p>
      )}

      {/* Case 2: Search term entered but no results */}
      {term?.trim() && searchProduct.length === 0 && (
        <p className="text-center text-gray-400 mb-6 text-lg">
          No products found for "<span className="font-semibold">{term}</span>"
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchProduct.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 shadow-md rounded-lg p-4 flex flex-col h-full text-white"
          >
            <Link
              to={`/product/${product._id}`}
              className="flex-grow flex flex-col items-center"
            >
              <img
                src={product.imgSrc}
                alt={product.title || 'Product image'}
                className="w-48 h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-center">
                {product.title}
              </h2>
              <p className="text-gray-400">${product.price}</p>
            </Link>
            <button
              className="mt-3 px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
              onClick={() => console.log('Add to cart:', product._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)

}

export default SearchProduct