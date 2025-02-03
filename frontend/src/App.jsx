import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Courses from './components/Courses'
import Dorms from './components/Dorms'
const App = () => {
  return (
    // route container
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/collection' element = {<Collection/>} />
      <Route path='/about' element = {<About/>} />
      <Route path='/contact' element = {<Contact/>} />
      <Route path='/product/:productId' element = {<Product/>} />
      <Route path='cart' element = {<Cart/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/place-order' element = {<PlaceOrder/>} />
      <Route path='order' element = {<Orders/>} />
      <Route path='/courses' element = {<Courses/>} />
      <Route path='/dorms' element = {<Dorms/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App