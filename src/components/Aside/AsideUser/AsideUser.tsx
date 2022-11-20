import React from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { authSys, logout } from '../../../features/auth/authSlice'
import { useState } from 'react'
import './AsideUser.scss'
import { addPost } from '../../../features/posts/postsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { post } from '../../../types'

interface props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AsideUser = ({ setMenuOpen }: props) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(authSys)

  const navigate = useNavigate()

  const initialState: post = {
    id: null,
    userId: user.id,
    gender: user.gender,
    username: user.username,
    title: '',
    body: '',
  }

  type form = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

  const [post, setPost] = useState<post>(initialState)
  const [submitable, setSubmitable] = useState<boolean>(false)

  const handleChange = (e: form) => {
    setPost((prev) => {
      prev = { ...prev, [e.target.name]: e.target.value }
      if (prev.title && prev.body) {
        setSubmitable(true)
      } else {
        setSubmitable(false)
      }
      return prev
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addPost(post))
    setPost(initialState)
    setSubmitable(false)
    setMenuOpen(false)
  }

  return (
    <div className='AsideUser' data-testid='asideUser'>
      <header>
        <div className='AsideUser__headerContainer'>
          <div>
            <button
              className='AsideUser__headerContainer--profile'
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button
              className='AsideUser__headerContainer--logout'
              data-testid='aside-logout'
              onClick={() => dispatch(logout())}
            >
              <FontAwesomeIcon icon={faPersonRunning} />
            </button>
          </div>
          <img
            src={`https://joeschmoe.io/api/v1/${user.gender}/${user.username}`}
            alt='Imagen de perfil'
          />
        </div>
        <h2>{user.username}</h2>
      </header>
      <form onSubmit={onSubmit} autoComplete='off'>
        <div>
          <label htmlFor='title'>Titulo</label>
          <p>
            {post.title?.length}
            <span> /20</span>
          </p>
        </div>
        <input
          type='text'
          name='title'
          id='title'
          onChange={handleChange}
          value={post.title ? post.title : ''}
          autoComplete='off'
          maxLength={20}
        />
        <div>
          <label htmlFor='body'>Cuerpo</label>
          <p>
            {post.body?.length}
            <span> /140</span>
          </p>
        </div>
        <textarea
          name='body'
          id='body'
          onChange={handleChange}
          value={post.body ? post.body : ''}
          maxLength={140}
          autoComplete='off'
        ></textarea>
        <button
          type='submit'
          disabled={!submitable}
          style={{
            opacity: submitable ? 1 : 0.7,
            cursor: submitable ? 'pointer' : 'no-drop',
          }}
        >
          Publicar
        </button>
      </form>
    </div>
  )
}

export default AsideUser
