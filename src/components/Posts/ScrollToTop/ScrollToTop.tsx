import React from 'react'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ScrollToTop.scss'

interface props {
  action: () => void
  scrollY: number
}

const ScrollToTop = ({ action, scrollY }: props) => {
  const avable = scrollY >= 800

  return (
    <button
      style={{ opacity: avable ? 1 : 0, transform: avable ? 'translateY(0)' : undefined }}
      className='ScrollToTop'
      onClick={action}
    >
      <FontAwesomeIcon icon={faAnglesUp} />
    </button>
  )
}

export default ScrollToTop
