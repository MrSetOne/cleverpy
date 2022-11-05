import React from 'react'
import './Aside.scss'
import { useAppSelector } from '../../app/hooks'
import { authSys } from '../../features/auth/authSlice'
import LogPage from './LogPage/LogPage'
import AsideUser from './AsideUser/AsideUser'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BurgerIcon from './BurgerIcon/BurgerIcon'

const Aside = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const burger: boolean = screenWidth <= 800

  const user = useAppSelector(authSys)

  const variants = {
    open: {
      left: '-10vw',
      boxShadow: burger ? '-22px 0px 35px 34px rgba(0, 0, 0, 0.749)' : undefined,
    },
    close: {
      left: '-100vw',
      boxShadow: burger ? '-22px 0px 35px 34px rgba(0, 0, 0, 0)' : undefined,
    },
  }

  return (
    <motion.aside
      className='asideMenu'
      variants={variants}
      initial={'close'}
      animate={menuOpen ? 'open' : 'close'}
    >
      {user.logged ? (
        <AsideUser setMenuOpen={setMenuOpen} />
      ) : (
        <LogPage setMenuOpen={setMenuOpen} />
      )}
      {burger && <BurgerIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
    </motion.aside>
  )
}

export default Aside
