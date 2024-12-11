import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './Pages/Home/Home'
import { Outlet, Route, Routes } from 'react-router-dom'
import NavBar from './Components/Header/NavBar'
import Footer from './Components/Footer/Footer'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import Upload from './Pages/Upload/Upload'
import Gallery from './Pages/Gallery/Gallery'
import CercuitHouse from './Pages/CercuitHouse/CercuitHouse'
import Books from './Pages/Books/Books'
import Profile from './Pages/Profile/Profile'
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard'
import NotFound from './Pages/NotFound/NotFound'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
function App() {
  
  return (
    <React.Fragment>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/cercuithouse' element={<CercuitHouse/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admindashboard' element={<AdminDashBoard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <div> */}
      <Outlet/>
      {/* </div> */}
      <Footer/>
    </React.Fragment>
  )
}

export default App
