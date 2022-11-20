import React from 'react'
import { useState } from 'react'
import './LogPage.scss'
import logo from '../../../assets/Logo-Cleverpy.png'
import { useAppDispatch } from '../../../app/hooks'
import { login } from '../../../features/auth/authSlice'

interface props {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LogPage = ({ setMenuOpen }: props) => {
  const dispatch = useAppDispatch()

  interface data {
    username: string
    password: string
  }

  const initialData: data = {
    username: '',
    password: '',
  }

  const [submitable, setSubmitable] = useState<boolean>(false)
  const [data, setData] = useState<data>(initialData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      prev = { ...prev, [e.target.name]: e.target.value }
      if (prev.username && prev.password) {
        setSubmitable(true)
      } else {
        setSubmitable(false)
      }
      return prev
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(data))
    setMenuOpen(false)
  }

  return (
    <div className='logPage' data-testid='logPage'>
      <img src={logo} alt='Cleverpy' />
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor='username'>Usuario</label>
        <input
          type='text'
          name='username'
          placeholder='Tu usuario'
          id='username'
          onChange={handleInputChange}
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          autoComplete='off'
          type='password'
          name='password'
          placeholder='Tu contraseña'
          id='password'
          onChange={handleInputChange}
        />
        <button
          type='submit'
          disabled={!submitable}
          style={{
            opacity: submitable ? 1 : 0.7,
            cursor: submitable ? 'pointer' : 'no-drop',
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LogPage
