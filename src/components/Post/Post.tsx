import { useAppDispatch } from "../../app/hooks"
import {deletePost} from '../../features/posts/postsSlice'


interface Props{
  post:{
    id:number,
    userId:number
    title:string,
    body:string
  },
  i:number,
}

const Post = ({post, i}:Props) => {

  const dispatch = useAppDispatch()

  const doADelete = (item:number) =>{
    dispatch(deletePost(item))
  }

  return (
    <div key={post.id}>
      <h1>{post.title}</h1>
      <button onClick={()=>doADelete(i)}>borrar</button>
    </div>
  )
}

export default Post