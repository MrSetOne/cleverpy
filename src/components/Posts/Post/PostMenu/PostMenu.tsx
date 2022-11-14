import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './PostMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faEyeSlash, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { tools } from '../../../../types'

interface props {
  setTools: React.Dispatch<React.SetStateAction<tools>>
  author: boolean
  tools: tools
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PostMenu = ({ tools, setTools, author, open, setOpen }: props) => {
  const variants = {
    container: {
      closed: {
        width: 40,
        transition: {
          duration: 0.3,
        },
      },
      open: {
        width: author ? 112 : 77,
      },
    },
    menuBotton: {
      closed: {
        marginLeft: -30,
        rotate: '-45deg',
      },
      open: {
        marginLeft: 6,
        rotate: '360deg',
      },
    },
    editButton: {
      closed: {
        marginLeft: -30,
        transition: {
          duration: 0.3,
        },
      },
      open: {
        marginLeft: 6,
        transition: {
          duration: 0.3,
        },
      },
    },
  }

  const mainClick = () => {
    if (open) {
      setOpen(false)
      setTools(false)
    } else {
      setOpen(true)
    }
  }
  return (
    <motion.div
      className='PostMenu'
      variants={variants.container}
      initial={'closed'}
      animate={open ? 'open' : 'closed'}
    >
      <motion.button
        className='PostMenu--switch'
        data-testid='PostMenu--switch'
        variants={variants.menuBotton}
        initial={'closed'}
        animate={open ? 'open' : 'closed'}
        whileHover={{ scale: 1.1 }}
        onClick={mainClick}
      >
        <FontAwesomeIcon icon={faXmark} />
      </motion.button>
      {author && (
        <motion.button
          className='PostMenu--edit'
          data-testid='PostMenu--edit'
          variants={variants.editButton}
          initial={'closed'}
          animate={open ? 'open' : 'closed'}
          whileHover={{ scale: 1.1 }}
          onClick={() => setTools(tools !== 'edit' ? 'edit' : false)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </motion.button>
      )}
      <motion.button
        className='PostMenu--delete'
        data-testid='PostMenu--delete'
        onClick={() => setTools(tools !== 'delete' ? 'delete' : false)}
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={author ? faBan : faEyeSlash} />
      </motion.button>
    </motion.div>
  )
}

export default PostMenu
