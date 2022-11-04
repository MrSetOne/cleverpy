import React from 'react'
import { useAppDispatch } from '../../../../app/hooks'
import { deletePost, updatePost } from '../../../../features/posts/postsSlice'
import { motion } from 'framer-motion'
import './PostTools.scss'
import { useState } from 'react'

type tools = 'edit' | 'delete' | false
type form =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

interface props {
  tools: 'edit' | 'delete'
  author: boolean
  i: number
  setTools: React.Dispatch<React.SetStateAction<tools>>
  post: {
    id: number
    userId: number | string
    gender?: 'female' | 'male'
    title: string
    body: string
  }
}

interface state {
  updating: 'title' | 'body'
  post: {
    title: string
    body: string
  }
}

interface show {
  title: number
  body: number
}

const PostTools = ({ tools, author, setTools, i, post }: props) => {
  const dispatch = useAppDispatch()

  const initialState: state = {
    updating: 'title',
    post: {
      title: post.title,
      body: post.body,
    },
  }

  const variants = {
    title: {
      height: '2.8rem',
      width: '7.3rem',
      left: 0,
      top: '-0.3rem',
    },
    body: {
      height: '2.8rem',
      width: '7.9rem',
      left: '7.7rem',
      top: '-0.3rem',
    },
  }

  const [state, setState] = useState<state>(initialState)
  const [show, setShow] = useState<show>({
    body: initialState.post.body.length,
    title: initialState.post.title.length,
  })

  const submitable =
    state.post.body.length <= 140 && state.post.title.length <= 20

  const handleChange = (e: form) => {
    setState((prev) => {
      prev.post = { ...prev.post, [e.target.name]: e.target.value }
      setShow({ ...show, [e.target.name]: e.target.value.length })
      return prev
    })
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(updatePost({ ...state.post, i }))
    setTools(false)
  }

  const doADelete = (item: number) => {
    dispatch(deletePost(item))
  }

  return (
    <div className="PostTools">
      {tools === 'delete' ? (
        <div className="PostTools__delete">
          <h3>¿Estás seguro de {author ? 'borrar' : 'ocultar'} este post?</h3>
          <div>
            <button onClick={() => doADelete(i)}>Si</button>
            <button onClick={() => setTools(false)}>No</button>
          </div>
        </div>
      ) : (
        <div className="PostTools__update">
          <div>
            <motion.div
              variants={variants}
              initial={'title'}
              animate={state.updating}
            />
            <p onClick={() => setState({ ...state, updating: 'title' })}>
              Titulo
            </p>
            <p onClick={() => setState({ ...state, updating: 'body' })}>
              Cuerpo
            </p>
          </div>
          <form
            style={{
              justifyContent: state.updating === 'title' ? 'center' : undefined,
            }}
          >
            {state.updating === 'title' ? (
              <>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={state.post.title}
                  onChange={handleChange}
                  maxLength={20}
                />
                <p>
                  {show.title}
                  <span> /20</span>
                </p>
              </>
            ) : (
              <>
                <textarea
                  name="body"
                  id="body"
                  defaultValue={state.post.body}
                  onChange={handleChange}
                  maxLength={140}
                />
                <p>
                  {show.body}
                  <span> /20</span>
                </p>
              </>
            )}
          </form>
          <footer>
            <button onClick={() => setTools(false)}>Volver</button>
            <button type="submit" disabled={!submitable} onClick={submit}>
              Editar
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}

export default PostTools
