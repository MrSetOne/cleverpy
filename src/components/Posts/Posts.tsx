import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getMorePosts, getPosts, postsSys } from '../../features/posts/postsSlice'
import Spinner from '../Spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import Post from './Post/Post'
import './Posts.scss'
import ScrollToTop from './ScrollToTop/ScrollToTop'

const Posts = () => {
  const { posts, isLoading, postsStorage } = useAppSelector(postsSys)
  const dispatch = useAppDispatch()

  const myRef = useRef<HTMLDivElement>(null)

  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  const handleUIEvent = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    e.stopPropagation() // Handy if you want to prevent event bubbling to scrollable parent
    setScrollY(e.currentTarget.scrollTop)
  }

  const downloadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      dispatch(getMorePosts())
      setLoadingMore(false)
    }, 1000)
  }

  const toTop = () => {
    if (myRef.current !== null) {
      myRef.current.scroll({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    toTop()
  }, [postsStorage])

  return (
    <div
      ref={myRef}
      onScrollCapture={handleUIEvent}
      className={`posts__container ${isLoading ? 'posts__container--loading' : null}`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        posts.map((item, i) => {
          return <Post post={item} i={i} key={item.id} />
        })
      )}
      {!isLoading && (
        <>
          <div className='posts__btn'>
            {postsStorage.length === posts.length ? (
              <div>
                <p>Ya no quedan mas posts...</p>
                <p>¿Porque no creas uno?</p>
              </div>
            ) : (
              <motion.button
                initial={{ width: 80 }}
                animate={{ width: loadingMore ? 37 : 80 }}
                onClick={() => downloadMore()}
              >
                {loadingMore ? <FontAwesomeIcon icon={faSpinner} /> : 'Ver mas'}
              </motion.button>
            )}
          </div>
          <ScrollToTop action={toTop} scrollY={scrollY} />
        </>
      )}
    </div>
  )
}

export default Posts
