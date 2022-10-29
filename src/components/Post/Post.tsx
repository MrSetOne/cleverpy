import { useAppDispatch } from "../../app/hooks"
import {deletePost} from '../../features/posts/postsSlice'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import './Post.scss'


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

  const pair = post.userId%2 === 0

  return (
    <article key={post.id} className='post'>
      <header className="post__header">
        <img 
          src={`https://joeschmoe.io/api/v1/${pair?'female':'male'}/${post.userId}`}
          alt={`Avatar de ${post.userId}`}
        />
        <h2>Usuario {post.userId}</h2>
        <button onClick={()=>doADelete(i)}>
          <FontAwesomeIcon icon={faBan} />
        </button>
      </header>
      <div className="post_content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </article>
  )
}

export default Post