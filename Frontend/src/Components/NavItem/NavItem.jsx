import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActive } from '../../redux/nav.redux';
function NavItem({item}) {
  // const[active,setActive] = useState('Home');
  // console.log(active);
  const active = useSelector(state=>state?.activeNav?.value);
  const dispatch = useDispatch();
  console.log('hello',active)

  const handleClick = (e)=>{
    // e.preventDefault();
    console.log('before',item.name)
    dispatch(setActive(item.name))
    console.log('after')
    setTimeout(() => {
      // Navigate after the state is updated
    }, 0);
  }

  return (
    <React.Fragment>
        <Link onClick={handleClick} to={`/${item.to}`} 
        className={` ${(active===item.name)?' bg-blue-700 text-white':''} hover:bg-blue-700 hover:text-white rounded-md px-2`}>
          {item.name}
          </Link>
    </React.Fragment>
  )
}

export default NavItem