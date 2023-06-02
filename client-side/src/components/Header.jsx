import React from 'react'
// import logo from "../rescources/logo.jpg" 
import logo2 from "../rescources/logo2.jfif" 
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import './Header.css'
import { IoIosSearch } from 'react-icons/io';




function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div id='container'>
    <img src={logo2} alt='' id='image'/>
    <p id='home'>Home</p>    
    <p id='menu'>Menu</p>
    <p id='service'>Service</p>

    <div className={`burger-icon ${isOpen ? 'open' : 'burger-icon'}`} onClick={handleClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className={`text ${isOpen ? 'show' : ''}`}>
        <div>Home</div>
        <div>Menu</div>
        <div>Service</div>
      </div>
    </div>

    

    <div className='input'>
      <IoIosSearch id='icon'/>
      <input placeholder='Search'/>
    </div>
    <FaShoppingCart id='cart'/>

    
    </div>
  )
}

export default Header