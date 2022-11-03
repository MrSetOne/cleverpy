import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface user {
  username: string | null
  gender: 'male' | 'female' | null
}

interface states {
  user: user
  logged: boolean
}

const initialState: states = {
  user: {
    username: null,
    gender: null,
  },
  logged: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user.gender = Math.round(Math.random()) ? 'female' : 'male'
      state.user.username = action.payload.username
      state.logged = true
    },
  },
})

export const { login } = authSlice.actions

export const authSys = (state: RootState) => state.user

export default authSlice.reducer
