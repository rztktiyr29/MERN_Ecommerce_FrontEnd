import React, { useContext } from "react";
import { data, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setFilterData, products, logout, isAuthenticated, cart, isAdmin } =
    useContext(AppContext);

  const filterByCategory = (cat) => {
    setFilterData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setFilterData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-950 fixed top-0 z-50 w-screen text-white px-2 py-4 overflow-x-hidden">
      <nav className=" flex justify-between items-center px-4 py-2 ">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl md:text-3xl font-bold overflow-y-hidden "
        >
          Ecommerce
        </Link>

        {/* Search Bar */}

        <div className="flex-grow max-w-md px-2">
          <form className="relative w-full" onSubmit={submitHandler}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
              className="w-full border text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Desktop menu */}

        <ul className="hidden md:flex items-center gap-4">
          {/* Not logged in */}
          {!isAuthenticated && (
            <>
              <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
              <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {/* Logged in users */}
          {isAuthenticated && (
            <>
              {/* Common user links */}
              <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                <Link to="/profile">Profile</Link>
              </li>

              {/* Admin-only links */}
              {isAdmin && (
                <>
                  <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                    <Link to="/admin/orders">Orders</Link>
                  </li>
                  <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                    <Link to="/admin/products">Manage Products</Link>
                  </li>
                </>
              )}

              {/* User-only links */}
              {!isAdmin && (
                <>
                  <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer relative">
                    <Link to="/cart" className="relative">
                      Cart
                      {cart?.items?.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {cart?.items?.length}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer">
                    <Link to="/orderhistory">My Orders</Link>
                  </li>
                </>
              )}

              {/* Logout */}
              <li
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 hover:cursor-pointer"
              >
                LogOut
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Icon */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden"
        >
          <img
            className="filter invert w-12 h-12 hover:cursor-pointer"
            src="https://www.svgrepo.com/show/506792/burger-menu-left.svg"
            alt=""
          />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="fixed top-24 h-screen w-screen left-0 right-0 px-6 flex flex-col gap-2 bg-gray-900 p-4 rounded-md shadow-lg md:hidden">
            {/* Guest Links */}
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Authenticated Users */}
            {isAuthenticated && (
              <>
                {/* Common */}
                <li>
                  <Link
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 "
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                {/* Admin Links */}
                {isAdmin && (
                  <>
                    <li>
                      <Link
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full"
                        to="/admin/orders"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full"
                        to="/admin/products"
                      >
                        Manage Products
                      </Link>
                    </li>
                  </>
                )}

                {/* Regular User Links */}
                {!isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/cart"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full relative"
                      >
                        Cart
                        {cart?.items?.length > 0 && (
                          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cart?.items?.length}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 w-full"
                        to="/orderhistory"
                      >
                        My Orders
                      </Link>
                    </li>
                  </>
                )}

                {/* Logout */}
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate("/");
                    }}
                    className="px-4 py-2 bg-gray-800 rounded-sm hover:bg-gray-600 "
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>

      {location.pathname == "/" && (
        <nav className="flex justify-between items-center px-4 py-4">
          <ul className="w-screen flex justify-around items-center">
            <li
              onClick={() => setFilterData(products)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              No Filter
            </li>
            <li
              onClick={() => filterByCategory("phone")}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              Mobiles
            </li>
            <li
              onClick={() => filterByCategory("laptop")}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              Laptops
            </li>
            <li
              onClick={() => filterByCategory("camera")}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              Cameras
            </li>
            <li
              onClick={() => filterByCategory("headphone")}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              Headphones
            </li>
            <li
              onClick={() => filterByPrice(99)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              99
            </li>
            <li
              onClick={() => filterByPrice(299)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              299
            </li>
            <li
              onClick={() => filterByPrice(699)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              699
            </li>
            <li
              onClick={() => filterByPrice(799)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              999
            </li>
            <li
              onClick={() => filterByPrice(1099)}
              className="text-xl font-bold hover:cursor-pointer hover:text-gray-400"
            >
              1099
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
