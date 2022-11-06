import axios from 'axios'
import { post } from '../../types'

const getPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const users = await axios.get('https://randomuser.me/api/?results=10')
  res.data.forEach((post: post) => {
    if (post.userId && post.userId) {
      post.gender = users.data.results[post.userId - 1].gender
      post.username = users.data.results[post.userId - 1].name.first
    }
  })
  res.data.sort(() => Math.random() - 0.5)
  return res.data
}

const postsService = {
  getPosts,
}

export default postsService
