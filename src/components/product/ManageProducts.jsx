import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { toast, Bounce } from "react-toastify";

const ManageProducts = () => {
  const { url, token } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    imgSrc: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/product/all`);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return toast.error("Title and Price required");

    setLoading(true);
    try {
      if (editId) {
        // Update
        const res = await axios.put(`${url}/product/${editId}`, form, {
          headers: {
            Auth: token,
          },
        });
        toast.success("Product updated successfully", { transition: Bounce });
      } else {
        // Add
        const res = await axios.post(`${url}/product/add`, form, {
          headers: {
            Auth: token,
          },
        });
        toast.success("Product added successfully", { transition: Bounce });
      }

      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        qty: "",
        imgSrc: "",
      });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit product
  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${url}/product/${id}`, {
        headers: {
          Auth: token,
        },
      });
      toast.success("Product deleted successfully", { transition: Bounce });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-2xl mb-4 font-semibold">
          {editId ? "Update Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={form.qty}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="text"
            name="imgSrc"
            placeholder="Image URL"
            value={form.imgSrc}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none col-span-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 outline-none col-span-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl transition"
        >
          {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between"
          >
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-60 h-60 object-contain my-4 rounded-md mx-auto"
            />
            <h3 className="text-xl font-semibold text-center">{product.title}</h3>
            <p className="text-gray-400 text-sm text-center">{product.category}</p>
            <p className="mt-2 text-lg font-medium text-center">${product.price}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
