import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface user {
  username: string | null
  gender: 'male' | 'female' | null
  id: number | null
}

interface states {
  user: user
}

const initialState: states = {
  user: {
    username: localStorage.username ? localStorage.username : null,
    gender: localStorage.gender ? localStorage.gender : null,
    id: localStorage.id ? Number(localStorage.id) : null,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user.gender = Math.round(Math.random()) ? 'female' : 'male'
      localStorage.setItem('gender', state.user.gender)
      state.user.username = action.payload.username
      localStorage.setItem('username', action.payload.username)
      state.user.id = Math.trunc(Math.random() * 100000000)
      localStorage.setItem('id', state.user.id.toString())
    },
  },
})

export const { login } = authSlice.actions

export const authSys = (state: RootState) => state.user

export default authSlice.reducer
