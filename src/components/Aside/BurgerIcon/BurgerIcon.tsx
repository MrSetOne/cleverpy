import React from 'react'
import { motion } from 'framer-motion'
import './BurgerIcon.scss'

interface props {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerIcon = ({ menuOpen, setMenuOpen }: props) => {
  const variants = {
    top: {
      open: {
        top: 13,
        rotate: ['0deg', '45deg'],
      },
      close: {
        top: [13, 13, 0],
        rotate: ['45deg', '0deg', '0deg'],
      },
    },
    mid: {
      open: {
        opacity: 0,
      },
      close: {
        opacity: [0, 0, 1],
        top: 13,
      },
    },
    bottom: {
      open: {
        bottom: 12,
        rotate: ['0deg', '-45deg'],
      },
      close: {
        bottom: [12, 12, 0],
        rotate: ['-45deg', '0deg', '0deg'],
      },
    },
    button: {
      open: {
        right: 0,
      },
      close: {
        right: -80,
      },
    },
  }

  return (
    <button className='BurgerIcon' onClick={() => setMenuOpen(!menuOpen)} data-testid='BurgerIcon'>
      <motion.div
        variants={variants.button}
        initial={'close'}
        animate={menuOpen ? 'open' : 'close'}
      >
        <motion.div
          variants={variants.top}
          initial={{ top: 0 }}
          animate={menuOpen ? 'open' : 'close'}
        />
        <motion.div
          variants={variants.mid}
          initial={{ top: 18 }}
          animate={menuOpen ? 'open' : 'close'}
        />
        <motion.div
          variants={variants.bottom}
          initial={{ bottom: 0 }}
          animate={menuOpen ? 'open' : 'close'}
        />
      </motion.div>
    </button>
  )
}

export default BurgerIcon
