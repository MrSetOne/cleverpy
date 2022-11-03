import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../app/store';
import postsService from "./postsService";

interface post{
    id:number,
    userId:number,
    gender?:'female' | 'male',
    title:string,
    body:string,
}

export interface states{
    isLoading:boolean,
    posts:post[],
    postsStorage:post[]
}

const initialState:states ={
    isLoading:true,
    posts:[],
    postsStorage:[]
}

export const getPosts = createAsyncThunk(
    "post/GetPosts", 
    async() => {
    try {
        return await postsService.getPosts()
    } catch (error) {
        console.error(error)
    }
});

export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        deletePost(state, action){
            state.postsStorage.splice(action.payload, 1)
            state.posts = state.postsStorage.slice(0,state.posts.length)
        },
        addPost(state,action){
            const newPost = {...action.payload, id:Math.trunc(Math.random()*100000000)}
            state.postsStorage = [newPost, ...state.postsStorage]
            state.posts = state.postsStorage.slice(0,state.posts.length)
        },
        updatePost(state,action){
            const {i,title,body} = action.payload
            state.postsStorage[i]={...state.postsStorage[i],title,body}
            state.posts[i]={...state.posts[i],title,body}
        },
        getMorePosts(state){
            let toExtract:number = 20
            if(state.posts.length+20 >= state.postsStorage.length){
                toExtract = state.postsStorage.length - state.posts.length
            }
            if(state.posts.length <= state.postsStorage.length){
                state.posts = state.postsStorage.slice(0,state.posts.length + toExtract)
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getPosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPosts.fulfilled,(state, action)=>{
            state.postsStorage = action.payload
            state.posts = action.payload.slice(0,20)
            state.isLoading=false
        })
    },
})

export const {deletePost,addPost,updatePost,getMorePosts} = postsSlice.actions

export const postsSys = (state:RootState) => state.posts

export default postsSlice.reducer;