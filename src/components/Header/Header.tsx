import React from 'react'
import './Header.scss'
import logo from '../../assets/Logo-Cleverpy-white.png'

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Cleverpy" />
    </header>
  )
}

export default Header
