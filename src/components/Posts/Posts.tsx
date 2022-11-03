import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts, postsSys } from "../../features/posts/postsSlice";
import Spinner from '../Spinner/Spinner';
import Post from './Post/Post';
import './Posts.scss'

const Posts = () => {

  const posts = useAppSelector(postsSys)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <section className={`posts__container ${posts.isLoading?'posts__container--loading':null}`}>
      {posts.isLoading?
        <Spinner/>:
        posts.posts.map((item,i)=>{
          return <Post post={item} i={i} key={item.id}/>
        })
      }
    </section>
  )


  
}

export default Posts