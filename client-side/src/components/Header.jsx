import React from 'react'
import logo from "../rescources/logo.jpg" 
import './Header.css'
import { IoIosSearch } from 'react-icons/io';




function Header() {
  return (
    <div id='container'>
    <img src={logo} alt='' id='image'/>
    <p id='home'>Home</p>
    <p id='booking'>Booking</p>
    <div className='input'>
      <IoIosSearch id='icon'/>
      <input placeholder='Search'/>
    </div>

    
    </div>
  )
}

export default Header