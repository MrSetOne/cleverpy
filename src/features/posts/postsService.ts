import axios from 'axios'

const getPosts = async()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(res.data)
    return res.data
}

const postsService = {
    getPosts
}

export default postsService