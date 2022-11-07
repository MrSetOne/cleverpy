import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Post.scss'
import { authSys } from '../../../features/auth/authSlice'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PostTools from './PostTools/PostTools'
import PostMenu from './PostMenu/PostMenu'
import { useNavigate } from 'react-router-dom'
import { post } from '../../../types'

interface Props {
  post: post
  i: number
}

type tools = 'edit' | 'delete' | false

const Post = ({ post, i }: Props) => {
  const { user } = useAppSelector(authSys)
  const navigate = useNavigate()

  const author = user.id === post.userId

  const [tools, setTools] = useState<tools>(false)
  const [open, setOpen] = useState<boolean>(false)

  const variants = {
    initial: {
      height: '21rem',
    },
    open: {
      height: '35rem',
    },
  }

  return (
    <motion.article
      className='post'
      variants={variants}
      initial='initial'
      animate={tools ? 'open' : 'initial'}
      whileHover={{ scale: 1.03 }}
    >
      <header className='post__header'>
        <div className='post__header--link' onClick={() => navigate(`/profile/${post.userId}`)}>
          <img
            src={`https://joeschmoe.io/api/v1/${post.gender}/${post.username}`}
            alt={`Avatar de ${post.userId}`}
          />
          <h2>{post.username}</h2>
        </div>
        <PostMenu setTools={setTools} author={author} tools={tools} open={open} setOpen={setOpen} />
      </header>
      {!tools ? (
        <div className='post_content'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ) : (
        <PostTools
          tools={tools}
          author={author}
          i={i}
          setTools={setTools}
          post={post}
          setOpen={setOpen}
        />
      )}
    </motion.article>
  )
}

export default Post
