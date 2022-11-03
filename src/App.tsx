import './App.scss'
import { useAppSelector } from './app/hooks'
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts/Posts'
import { authSys } from './features/auth/authSlice'
import Unlogged from './components/Unlogged/Unlogged'

function App() {
  const { logged } = useAppSelector(authSys)

  return (
    <div className="App">
      <Header />
      <Aside />
      {logged ? (
        <Routes>
          <Route path="/" element={<Posts />} />
        </Routes>
      ) : (
        <Unlogged />
      )}
    </div>
  )
}

export default App
