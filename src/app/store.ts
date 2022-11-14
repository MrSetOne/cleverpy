import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit'
import posts from '../features/posts/postsSlice'
import user from '../features/auth/authSlice'

const rootReducer = combineReducers({
  posts: posts,
  user: user,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
