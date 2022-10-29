import './App.scss'
import {useEffect} from 'react'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {getPosts, postsSys} from './features/posts/postsSlice'
import { useAppSelector , useAppDispatch} from './app/hooks'
import Post from './components/Post/Post'

function App() {

  const posts = useAppSelector(postsSys)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getPosts())
  }, [])
  

  return (
    <div className="App">
      <h1>¡Hola Cleverpy!</h1>
      {posts.isLoading?
        <h2>Cargando...</h2>:
          posts.posts.map((item,i)=>{
            return <Post post={item} i={i}/>
        })
      } 
    </div>
  )
}

export default App
