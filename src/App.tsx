import './App.scss'
import {useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {getPosts, postsSys} from './features/posts/postsSlice'
import { useAppSelector , useAppDispatch} from './app/hooks'
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import {Routes, Route} from 'react-router-dom'
import Posts from './components/Posts/Posts'

function App() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
        <Routes>
          <Route path='/' element={<Posts/>}/>
        </Routes>
    </div>
  )
}

export default App
