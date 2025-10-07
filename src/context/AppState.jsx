import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  // const url = "http://localhost:3000/api";
   const url = "https://mern-ecommerce-api-9e9r.onrender.com/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products)
      setProducts(api.data.products);
      setFilterData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
  }, [token, reload]);

  useEffect(() => {
  const lstoken = localStorage.getItem("token");
  const lsrole = localStorage.getItem("role");

  if (lstoken) {
    setToken(lstoken);
    setIsAuthenticated(true);
  }

  if (lsrole) {
    setRole(lsrole);
    setIsAdmin(lsrole === "admin");
  }
}, []);

// Log whenever isAdmin or role changes
// useEffect(() => {
//   console.log("Role:", role);
//   console.log("isAdmin:", isAdmin);
// }, [role, isAdmin]);



  // register user

  const register = async (name, email, password , role) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password ,role},
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // console.log("user register ", api)
  };

  // Login User

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    console.log("user login ", api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);
    setRole(api.data.role)
    setIsAdmin(api.data.role === "admin");
    localStorage.setItem("token", api.data.token);
    localStorage.setItem("role", api.data.role);
    return api.data;
  };

  // Logout user
  const logout = () => {
    setToken(" ");
    setIsAuthenticated(false);
    setRole(" ")
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("User logout successfully...!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // User Profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user profile",api.data.user)
    setUser(api.data.user);
  };

  // Add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log("my cart", api);
  };

  // user cart
  const userCart = async () => {
    if (!token) return;
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    // console.log("user cart", api.data.cart);
    setCart(api.data.cart);
  };

  // --qty quantity

  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      {
        productId,
        qty,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log("decrease cart", api);
    // setCart(api.data.cart)
  };

  // remove item from cart

  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log("decrease cart", api);
    // setCart(api.data.cart)
  };

  // clear cart

  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // console.log("decrease cart", api);
    // setCart(api.data.cart)
  };

  // shipping address

  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  const getAddress = async () => {
    if (!token) return;
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("address", api.data?.userAddress);
    setUserAddress(api.data.userAddress)
  };

    // Add to cart
//   const addProduct = async (title, description,price, category , qty, imgSrc) => {
//     const api = await axios.post(
//       `${url}/product/add`,
//       { title, description,price, category , qty, imgSrc },
//       {
//         headers: {
//           "Content-Type": "Application/json",
//           Auth: token,
//         },
//         withCredentials: true,
//       }
//     );
//     setReload(!reload);
//     toast.success(api.data.message, {
//       position: "top-center",
//       autoClose: 1500,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       transition: Bounce,
//     });

//     console.log("Product added:", api.data);
// };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filterData,
        setFilterData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        role,
        isAdmin,
        setIsAdmin,
        userAddress
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
