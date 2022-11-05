import axios from 'axios'

interface post {
  id: number
  userId: number
  title: string
  body: string
  gender: 'female' | 'male'
}

const getPosts = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const users = await axios.get('https://randomuser.me/api/?results=10')
  console.log(res.data)
  res.data.forEach((post: post) => {
    post.gender = users.data.results[post.userId - 1].gender
    post.userId = users.data.results[post.userId - 1].name.first
  })
  res.data.sort(() => Math.random() - 0.5)
  return res.data
}

const postsService = {
  getPosts,
}

export default postsService
