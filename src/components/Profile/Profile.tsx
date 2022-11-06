import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPosts, getProfile, postsSys } from '../../features/posts/postsSlice'
import Posts from '../Posts/Posts'
import Spinner from '../Spinner/Spinner'
import './Profile.scss'

const Profile = () => {
  const { id } = useParams()

  const { postsStorage, profile, isLoading } = useAppSelector(postsSys)
  const dispatch = useAppDispatch()

  const opening = async () => {
    const target = Number(id)
    if (postsStorage.length === 0) {
      console.log('descargo')
      await dispatch(getPosts())
    }
    dispatch(getProfile(target))
  }

  useEffect(() => {
    console.log('me ejecuto')
    console.log(id)
    opening()
  }, [])

  return (
    <section className='Profile__container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='Profile'>
          <header>
            <div>
              <img
                src={`https://joeschmoe.io/api/v1/${profile?.gender}/${profile?.username}`}
                alt={`Avatar de ${profile?.username}`}
              />
            </div>
            <h2>{profile?.username}</h2>
          </header>
          <Posts isProfile={true} />
        </div>
      )}
    </section>
  )
}

export default Profile
