import React from "react";
import { useNavigate } from "react-router-dom";
import { useState  , useContext} from "react";
import AppContext from "../context/AppContext";

const Address = () => {
  const navigate = useNavigate()
  const {shippingAddress , userAddress} = useContext(AppContext)
  const [formData, setFormData] = useState({
    fullName:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    phoneNumber:""

  })
    const onChangeHandler = (e)=>{
    const{name , value} = e.target
    setFormData({...formData , [name]:value})
  }
  const {fullName , address , city , state , country , pincode , phoneNumber } = formData
  const submitHandler = async (e)=>{
    e.preventDefault()
    const result = await shippingAddress(fullName , address , city , state , country , pincode , phoneNumber )
    if(result?.success){
      navigate('/checkout')
    }
    setFormData({
    fullName:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    phoneNumber:""

  })
  }
  return (
    <div className="mt-22 bg-gray-900 flex justify-center  h-screen w-screen">
      <div className="w-full max-w-7xl my-10 ">
        <h1 className="text-3xl text-white font-bold text-center my-2">
          Shipping Address
        </h1>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-3 px-4">
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail1">
                Full Name
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.fullName}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="fullName"
                id="exampleInputEmail1"
                placeholder="Enter full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail2">
                Country
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.country}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="country"
                id="exampleInputEmail2"
                placeholder="Country"
              />
            </div>
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail3">
                State
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.state}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="state"
                id="exampleInputEmail3"
                placeholder="state"
              />
            </div>
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail4">
                City
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.city}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="city"
                id="exampleInputEmail4"
                placeholder="city"
              />
            </div>
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail5">
                Pincode
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.pincode}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="pincode"
                id="exampleInputEmail5"
                placeholder="pincode"
              />
            </div>
            <div className="flex flex-col">
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail6">
                Phone Number
              </label>
              <input
              onChange={onChangeHandler}
              value={formData.phoneNumber}
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="phoneNumber"
                id="exampleInputEmail6"
                placeholder="phone number"
              />
            </div>
            <div>
              <label className="mx-4 text-xl text-white font-bold" htmlFor="exampleInputEmail7">
                Address Line/Nearby
              </label>
              <textarea
              onChange={onChangeHandler}
              value={formData.address}
                type="text"
                className="border mx-4 my-2 text-white bg-gray-800 border-gray-600 rounded-md pl-6 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                cols={25}
                rows={6}
                name="address"
                id="exampleInputEmail7"
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:flex md:justify-center md:gap-4 mt-4 px-4">
            <button
              type="submit"
              className="w-full md:w-auto border ml-1 mr-8 my-3 text-white font-bold bg-blue-600 border-gray-600 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
        {userAddress && (
        <button
          onClick={()=> navigate('/checkout')}
              type="button"
              className="w-full text-center md:w-auto border mx-auto block my-3 text-white font-bold bg-amber-500 border-gray-600 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:bg-amber-400"
            >
              Use Old Address
            </button>
        )}
      </div>
    </div>
  );
};

export default Address;
