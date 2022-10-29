import axios from 'axios'

const getPosts = async()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return res.data
}

const postsService = {
    getPosts
}

export default postsService