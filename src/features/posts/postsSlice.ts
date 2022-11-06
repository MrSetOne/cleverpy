import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import postsService from './postsService'

interface post {
  id: number
  userId: number
  username: string
  gender: 'female' | 'male'
  title: string
  body: string
}

interface profile {
  id: number
  username: string
  gender: 'female' | 'male'
  posts: post[]
}

export interface states {
  isLoading: boolean
  posts: post[]
  postsStorage: post[]
  profile: profile | null
}

const initialState: states = {
  isLoading: true,
  posts: [],
  postsStorage: [],
  profile: null,
}

export const getPosts = createAsyncThunk('post/GetPosts', async () => {
  try {
    return await postsService.getPosts()
  } catch (error) {
    console.error(error)
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost(state, action) {
      console.log(action.payload)
      state.postsStorage = state.postsStorage.filter((item) => item.id !== action.payload)
      state.posts = state.posts.filter((item) => item.id !== action.payload)
      if (state.profile) {
        state.profile.posts = state.profile?.posts.filter((item) => item.id !== action.payload)
      }
    },
    addPost(state, action) {
      const newPost = {
        ...action.payload,
        // userId:Number(action.payload.userId),
        id: Math.trunc(Math.random() * 100000000),
      }
      state.postsStorage = [newPost, ...state.postsStorage]
      state.posts = state.postsStorage.slice(0, state.posts.length)
    },
    updatePost(state, action) {
      const { i, title, body } = action.payload
      state.postsStorage[i] = { ...state.postsStorage[i], title, body }
      state.posts[i] = { ...state.posts[i], title, body }
    },
    getMorePosts(state) {
      let toExtract = 20
      if (state.posts.length + 20 >= state.postsStorage.length) {
        toExtract = state.postsStorage.length - state.posts.length
      }
      if (state.posts.length <= state.postsStorage.length) {
        state.posts = state.postsStorage.slice(0, state.posts.length + toExtract)
      }
    },
    getProfile(state, action) {
      state.isLoading = true
      console.log(`Se solicita ${action.payload}`)
      const i = state.postsStorage.findIndex((item) => item.userId === action.payload)
      console.log(i)
      state.profile = {
        id: state.postsStorage[i].userId,
        username: state.postsStorage[i].username,
        gender: state.postsStorage[i].gender,
        posts: state.postsStorage.filter((item) => item.userId === action.payload),
      }
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsStorage = action.payload.map((item: post, i: number) => {
          if (item.title.length >= 17) {
            item.title = `${item.title.slice(0, 17)}...`
          }
          if (item.body.length >= 137) {
            item.body = `${item.body.slice(0, 137)}...`
          }
          return item
        })
        state.posts = state.postsStorage.slice(0, 20)
        state.isLoading = false
      })
  },
})

export const { deletePost, addPost, updatePost, getMorePosts, getProfile } = postsSlice.actions

export const postsSys = (state: RootState) => state.posts

export default postsSlice.reducer
