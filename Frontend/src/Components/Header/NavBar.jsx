import React from 'react'
import NavItem from '../NavItem/NavItem'
import logo from '../../../public/logo-2.png'
import { Link } from 'react-router-dom';
import menu from '../../../public/ham_berger.png'
import { useDispatch, useSelector } from 'react-redux';
import { togleNav } from '../../redux/nav.redux';

function NavBar() {
  const role = 'register';
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
  const togle = useSelector(state => state?.togle?.togle)
  const dispatch = useDispatch();
  const menuClick = () => {
    dispatch(togleNav());
    console.log(togle);
  }
  const handleButtonClick = ()=>{
    dispatch(togleNav());
  }
  return (
    <React.Fragment>

      <div className='p-4 border-b-2 fixed top-0 left-0 w-full bg-white flex z-50'>
        <div className='w-11/12 m-auto flex justify-between gap-5 items-center'>
          <div className=''>
            <Link className='flex gap-2 items-center justify-between' to={`/`}>
              <img className=' h-10 ' src={logo} alt="" />
              <span className=' text-lg'>A.E.-Association</span>
            </Link>
          </div>

          {/* <div className='  justify-between gap-20 '> */}
          <div className='gap-1 text-lg hidden xl:flex '>
            {
              navItems.map((item, index) => (
                (item.role == role || role == 'admin' || item.role == 'public') &&
                <NavItem key={index} item={item} />
              ))
            }
          </div>
          <div className='gap-2 hidden xl:flex'>
            {
              role == 'register' && <>
                <Link to={`/login`} className=' flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
                  Login
                </Link>
                <Link to={`register`} className='flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
                  Register
                </Link>
              </>
            }
            {
              (role == 'user' || role == 'admin') &&
              <Link to={`login`} className='flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
                Logout
              </Link>
            }
          </div>
          {/* </div> */}
        </div>

        <button onClick={menuClick} className='block xl:hidden z-[9999]'>
          <img className=' z-50 h-10 w-10' src={menu} alt="" />
        </button>
      </div>

      <div className={`z-40 mt-16 ${togle ?'fixed  xl:hidden left-0 top-0 w-full h-full bg-[#ffffff] ease-in-out duration-500':'ease-in-out duration-500 fixed top-0 bottom-0 left-[-200%]'}`}>
        <div className=' flex flex-col gap-2 p-4'>
          {
            navItems.map((item, index) => (
              (item.role == role || role == 'admin' || item.role == 'public') &&
              <NavItem key={index} item={item} />
            ))
          }
          {
            role == 'register' && <>
              <Link onClick={handleButtonClick} to={`/login`} className=' flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
                Login
              </Link>
              <Link onClick={handleButtonClick} to={`register`} className='flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
                Register
              </Link>
            </>
          }
          {
            (role == 'user' || role == 'admin') &&
            <Link to={`login`} className='flex justify-center items-center py-2 px-4 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700'>
              Logout
            </Link>
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavBar