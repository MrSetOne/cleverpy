import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../app/store';
import postsService from "./postsService";

interface post{
    id:number,
    userId:number
    title:string,
    body:string,
}

export interface states{
    isLoading:boolean,
    posts:post[]
}

const initialState:states ={
    isLoading:true,
    posts:[]
}

export const getPosts = createAsyncThunk(
    "post/GetPosts", 
    async() => {
    try {
        return await postsService.getPosts()
    } catch (error) {
        console.log(error)
    }
});

export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        deletePost(state, action){
            console.log(action)
            state.posts.splice(action.payload, 1)
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getPosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPosts.fulfilled,(state, action)=>{
            state.posts = action.payload
            state.isLoading=false
        })
    },
})

export const {deletePost} = postsSlice.actions

export const postsSys = (state:RootState) => state.posts

export default postsSlice.reducer;