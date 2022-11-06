import React from 'react'
import './App.scss'
import { useAppSelector } from './app/hooks'
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts/Posts'
import { authSys } from './features/auth/authSlice'
import Unlogged from './components/Unlogged/Unlogged'
import Profile from './components/Profile/Profile'

function App() {
  const { user } = useAppSelector(authSys)

  return (
    <div className='App'>
      <Header />
      <Aside />
      {user.username ? (
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      ) : (
        <Unlogged />
      )}
    </div>
  )
}

export default App
