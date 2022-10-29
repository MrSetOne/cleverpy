import './App.scss'
import {useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {getPosts} from './features/posts/postsSlice'

function App() {

  // !! CON UN ANY SE SOLUCIONA PERO NO SE PUEDE UTILIZAR !!
  // const dispatch = useDispatch<any>()
  const dispatch = useDispatch()
  // const { posts } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className="App">
      <h1>¡Hola Cleverpy!</h1>
    </div>
  )
}

export default App
