import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { authSys } from '../../../features/auth/authSlice'
import {useState} from 'react'
import './AsideUser.scss'
import { addPost } from '../../../features/posts/postsSlice'


const AsideUser = () => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(authSys)

  interface post{
    userId:string|null,
    gender:string|null,
    title:string,
    body:string,
  }

  const initialState:post = {
    userId:user.user.username,
    gender: user.user.gender,
    title:'',
    body:''
  }

  type form = React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>


  const [post, setPost] = useState<post>(initialState)
  const [submitable, setSubmitable] = useState<boolean>(false)

  const handleChange = (e:form) =>{
    setPost(prev=>{
      prev={...prev,[e.target.name]:e.target.value}
      if(prev.title && prev.body){
        setSubmitable(true)
      }else{
        setSubmitable(false)
      }
      return prev
    })
  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(addPost(post))
  }

  return (
    <div className="AsideUser">
      <div>
        <img
          src={`https://joeschmoe.io/api/v1/${user.user.gender}/${user.user.username}`}
          alt="Imagen de perfil"
        />
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input type="text" name="title" id="title" onChange={handleChange}/>
        <label htmlFor="body">Cuerpo</label>
        <textarea name="body" id="body" onChange={handleChange}></textarea>
        <button
          type="submit"
          disabled={!submitable}
          style={{
            opacity:submitable?1:.7,
            cursor:submitable?"pointer":'no-drop'
          }}
          >Publicar
        </button>
      </form>
    </div>
  )
}

export default AsideUser