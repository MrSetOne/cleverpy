import { configureStore ,ThunkAction, Action} from '@reduxjs/toolkit';
import posts from "../features/posts/postsSlice"
import user from '../features/auth/authSlice'


export const store = configureStore({
    reducer: {
        posts,
        user
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;