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

  useEffect(() => {
    // Get the active route name from the current location
    const currentPath = location.pathname.split('/')[1] || ''; // Default to 'home' if no path
    console.log('current',currentPath);
    dispatch(setActive(currentPath));
  }, [dispatch, location]);

  const handleClick = (e)=>{
    // e.preventDefault();
    dispatch(setActive(item.to || ''))
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