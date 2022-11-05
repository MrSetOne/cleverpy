import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './ScrollToTop.scss'

interface props {
  action: () => void
}

const ScrollToTop = ({ action }: props) => {
  return (
    <button className='ScrollToTop' onClick={action}>
      <FontAwesomeIcon icon={faAnglesUp} />
    </button>
  )
}

export default ScrollToTop
