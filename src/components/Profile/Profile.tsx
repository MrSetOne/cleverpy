import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPosts, getProfile, postsSys } from '../../features/posts/postsSlice'
import Spinner from '../Spinner/Spinner'

const Profile = () => {
  const { id } = useParams()

  const { postsStorage, profile, isLoading } = useAppSelector(postsSys)
  const dispatch = useAppDispatch()

  const opening = async () => {
    const target = Number(id)
    if (postsStorage.length === 0) {
      await dispatch(getPosts())
    }
    dispatch(getProfile(target))
  }

  useEffect(() => {
    opening()
  }, [])

  return (
    <div className='Profile__container'>
      <h1>{isLoading ? <Spinner /> : profile?.username}</h1>
    </div>
  )
}

export default Profile
