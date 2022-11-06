import React from 'react'
import './Header.scss'
import logo from '../../assets/Logo-Cleverpy-white.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className='header'>
      <img src={logo} alt='Cleverpy' onClick={() => navigate('/')} />
    </header>
  )
}

export default Header
