import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Your form has been submitted")
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    }
    // console.log(formData);
  };
  return (
    <div className="mt-22 bg-gray-900 h-screen w-screen">
      <div className="bg-gray-800 text-white max-w-xl px-4 pt-6 pb-8 mx-6 sm:mx-auto my-30 rounded-md">
        <h1 className="text-center text-3xl font-bold py-4">Login Page</h1>
        <form className="flex flex-col " onSubmit={submitHandler}>
          <input
            value={formData.email}
            onChange={onChangeHandler}
            name="email"
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={formData.password}
            onChange={onChangeHandler}
            name="password"
            className="border mx-4 my-3 text-white bg-gray-800 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter password"
          />
          <button
            className="border mx-4 my-3 text-white bg-blue-600 border-gray-600 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:bg-blue-500 "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
