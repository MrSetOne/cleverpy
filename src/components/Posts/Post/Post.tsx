import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Post.scss'
import { authSys } from '../../../features/auth/authSlice'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PostTools from './PostTools/PostTools'

interface Props {
  post: {
    id: number
    userId: number | string
    gender?: 'female' | 'male'
    title: string
    body: string
  }
  i: number
}

type tools = 'edit' | 'delete' | false

const Post = ({ post, i }: Props) => {
  const { user, logged } = useAppSelector(authSys)

  const gender = post.gender ? post.gender : Number(post.userId) % 2 === 0 ? 'female' : 'male'

  const author = user.username === post.userId

  const [tools, setTools] = useState<tools>(false)

  const noName = typeof post.userId === 'number'

  const variants = {
    initial: {
      height: '24rem',
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
        <img
          src={`https://joeschmoe.io/api/v1/${gender}/${post.userId}`}
          alt={`Avatar de ${post.userId}`}
        />
        <h2>{noName ? `Usuario ${post.userId}` : post.userId}</h2>
        <div className='post__btns'>
          {author && (
            <button
              className='post__btns--edit'
              onClick={() => setTools(tools !== 'edit' && 'edit')}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
          {logged && (
            <button
              className='post__btns--delete'
              onClick={() => setTools(tools !== 'delete' && 'delete')}
            >
              <FontAwesomeIcon icon={author ? faBan : faEyeSlash} />
            </button>
          )}
        </div>
      </header>
      {!tools ? (
        <div className='post_content'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ) : (
        <PostTools tools={tools} author={author} i={i} setTools={setTools} post={post} />
      )}
    </motion.article>
  )
}

export default Post
