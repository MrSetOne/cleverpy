import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

interface post{
    id:number,
    userId:number
    title:string,
    body:string,
}

interface states{
    isLoading:boolean,
    posts:post[]
}

const initialState:states ={
    isLoading:true,
    posts:[]
}

export const getPosts = createAsyncThunk("post/GetPosts", async() => {
    try {
        return await postsService.getPosts()
    } catch (error) {
        console.log(error)
        // Falta poner el thunkAPI.rejectWithValue de la polla que da error por el tipo
    }
});

export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
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

export default postsSlice.reducer;