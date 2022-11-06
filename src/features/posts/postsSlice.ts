import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import postsService from './postsService'
import { post } from '../../types'

interface profile {
  id: number | null
  username: string | null
  gender: 'female' | 'male' | null
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
      const customPosts: post[] = JSON.parse(localStorage.customPosts)
      localStorage.setItem(
        'customPosts',
        JSON.stringify(customPosts.filter((item) => item.id !== action.payload)),
      )
      state.postsStorage = state.postsStorage.filter((item) => item.id !== action.payload)
      state.posts = state.posts.filter((item) => item.id !== action.payload)
      if (state.profile) {
        state.profile.posts = state.profile?.posts.filter((item) => item.id !== action.payload)
      }
    },
    addPost(state, action) {
      const newPost = {
        ...action.payload,
        id: Math.trunc(Math.random() * 100000000),
      }
      const customPosts = JSON.parse(localStorage.customPosts)
      localStorage.setItem('customPosts', JSON.stringify([newPost && newPost, ...customPosts]))
      state.postsStorage = [newPost, ...state.postsStorage]
      state.posts = state.postsStorage.slice(0, state.posts.length)
    },
    updatePost(state, action) {
      const { i, title, body, id } = action.payload
      const customPosts: post[] = JSON.parse(localStorage.customPosts)
      const customIndex = customPosts.findIndex((item) => item.id === id)
      customPosts[customIndex] = { ...customPosts[customIndex], title, body }
      localStorage.setItem('customPosts', JSON.stringify(customPosts))
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
      const i = state.postsStorage.findIndex((item) => item.userId === action.payload)
      if (i === -1) {
        state.profile = null
      } else {
        state.profile = {
          id: state.postsStorage[i].userId,
          username: state.postsStorage[i].username,
          gender: state.postsStorage[i].gender,
          posts: state.postsStorage.filter((item) => item.userId === action.payload),
        }
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
          if (item.title && item.title.length >= 17) {
            item.title = `${item.title.slice(0, 17)}...`
          }
          if (item.body && item.body.length >= 137) {
            item.body = `${item.body.slice(0, 137)}...`
          }
          return item
        })
        state.postsStorage = [...JSON.parse(localStorage.customPosts), ...state.postsStorage]
        state.posts = state.postsStorage.slice(0, 20)
        state.isLoading = false
      })
  },
})

export const { deletePost, addPost, updatePost, getMorePosts, getProfile } = postsSlice.actions

export const postsSys = (state: RootState) => state.posts

export default postsSlice.reducer
