import React from 'react'
import NavItem from '../NavItem/NavItem'
import logo from '../../../public/logo-2.png'
import { Link } from 'react-router-dom';

function NavBar() {
  const role = 'admin';
  const navItems = [
    {
      name: 'Home',
      to: '',
      role: 'public',

    },
    {
      name: 'About',
      to: 'about',
      role: 'public'
    },
    {
      name: 'Contact',
      to: 'contact',
      role: 'public',
    },
    {
      name: 'Upload',
      to: 'upload',
      role: 'user',
    },
    {
      name: 'Gallery',
      to: 'gallery',
      role: 'public',
    },
    {
      name: 'Stay',
      to: 'cercuithouse',
      role: 'user',
    },
    {
      name: 'Books',
      to: 'books',
      role: 'user',
    },
    {
      name: 'Profile',
      to: 'profile',
      role: 'user',
    },
    {
      name: 'AdminDashBoard',
      to: 'admindashboard',
      role: 'admin',
    },
  ]
  return (
    <div className='p-4 border-b-2 fixed top-0 left-0 w-full bg-white'>
      <div className='w-11/12 m-auto flex justify-between items-center'>
        <div className=''>
          <Link className='flex gap-2 items-center justify-between' to={`/`}>
            <img className=' h-10 ' src={logo} alt="" />
            <span className=' text-lg'>A.E.-Association</span>
          </Link>
        </div>
        <div className=' flex gap-4  text-lg'>
          {
            navItems.map((item, index) => (
              (item.role == role || role == 'admin' || item.role == 'public') &&
              <NavItem item={item} />
            ))
          }
        </div>
        <div className=' flex gap-2'>
          {
            role=='register'&&<>
            <Link to={`/login`} className=' flex justify-center items-center py-1 px-5 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
            Login
          </Link>
          <Link to={`register`} className='flex justify-center items-center py-1 px-5 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
            Register
          </Link>
          </>
          }
          {
            (role == 'user' || role == 'admin') &&
            <Link to={`login`} className='flex justify-center items-center py-1 px-5 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
            Logout
          </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar