import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { authSys } from '../../features/auth/authSlice'
import { getPosts, getProfile, postsSys } from '../../features/posts/postsSlice'
import Posts from '../Posts/Posts'
import Spinner from '../Spinner/Spinner'
import './Profile.scss'

const Profile = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const { postsStorage, profile, isLoading } = useAppSelector(postsSys)
  const { user } = useAppSelector(authSys)

  const navigate = useNavigate()

  const itsMe = Number(id) === user.id

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
    <section className='Profile__container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='Profile'>
          <button onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faAnglesLeft} />
            Volver
          </button>
          <header>
            <div>
              <img
                src={`https://joeschmoe.io/api/v1/${profile ? profile.gender : user.gender}/${
                  profile ? profile.username : user.username
                }`}
                alt={`Avatar de ${profile ? profile.username : user.username}`}
              />
            </div>
            <h2>{profile ? profile.username : user.username}</h2>
          </header>
          {profile?.posts.length !== 0 ? (
            <Posts isProfile={true} />
          ) : (
            <h2>Aun no has realizado ningún post.</h2>
          )}
        </div>
      )}
    </section>
  )
}

export default Profile
