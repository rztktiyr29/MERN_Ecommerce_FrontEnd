import React, { Profiler, useContext } from 'react'
import AppContext from "./context/AppContext"
import ShowProduct from './components/product/showProduct'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import ProductDetails from './components/product/ProductDetails'
import Navbar from './components/Navbar'
import SearchProduct from './components/product/SearchProduct'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Address from './components/Address'
import { ToastContainer, toast } from "react-toastify";
import Profile from './components/user/profile'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Success from './components/Success'
import ManageProducts from './components/product/ManageProducts'
import AdminOrders from './components/AdminOrders'
import OrderHistory from './components/OrderHistory'



const App = () => {
  // const {data} = useContext(AppContext)
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<ShowProduct/>}/>
        <Route path='/product/search/:term?' element= {<SearchProduct/>} />
        <Route path='/product/:id' element= {<ProductDetails/>} />
        <Route path='/register' element={<Register/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/profile' element={ <Profile/> }/>
        <Route path='/cart' element={<Cart/> }/>
        <Route path='/shipping' element={<Address/> }/>
        <Route path='/checkout' element={<Checkout/> }/>
        <Route path='/success/:sessionId' element={<Success/> }/>
        <Route path='/orderhistory' element={<OrderHistory/> }/>
        <Route path='/admin/products' element={<ManageProducts/> }/>
        <Route path='/admin/orders' element={<AdminOrders/> }/>


        

      </Routes>
    </Router>
  )
}

export default App