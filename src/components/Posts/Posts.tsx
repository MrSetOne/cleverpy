import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts, postsSys } from "../../features/posts/postsSlice";
import Post from '../Post/Post';
import './Posts.scss'

const Posts = () => {

  const posts = useAppSelector(postsSys)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className='posts__container'>
      {posts.isLoading?
        <h2>Cargando...</h2>:
        posts.posts.map((item,i)=>{
          return <Post post={item} i={i}/>
        })
      }
    </div>
  )


  
}

export default Posts