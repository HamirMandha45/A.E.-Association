import React, { useEffect, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActive } from '../../redux/nav.redux';
function NavItem({item}) {
  // const[active,setActive] = useState('Home');
  // console.log(active);
  const active = useSelector(state=>state?.activeNav?.value);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log('hello',active)

  useEffect(() => {
    // Get the active route name from the current location
    const currentPath = location.pathname.split('/')[1] || 'home'; // Default to 'home' if no path
    dispatch(setActive(currentPath));
  }, [dispatch, location]);

  const handleClick = (e)=>{
    // e.preventDefault();
    console.log('before',item.name)
    dispatch(setActive(item.to || 'home'))
    console.log('after')
  }

  return (
    <React.Fragment>
        <Link onClick={handleClick} to={`/${item.to}`} 
        className={` ${(active===item.to)?' bg-blue-700 text-white':''} hover:bg-blue-700 hover:text-white rounded-md px-2`}>
          {item.name}
          </Link>
    </React.Fragment>
  )
}

export default NavItem