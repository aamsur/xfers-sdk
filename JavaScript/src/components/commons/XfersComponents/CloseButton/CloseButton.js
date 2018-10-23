import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import classes from './CloseButton.scss'

const CloseButton = ({customClass, onClick}) => {

  const closeBtnClass = cx(customClass, classes.closeBtn)

  return (
    <svg className={closeBtnClass} onClick={onClick}>
      <line x1="1" y1="16"
        x2="16" y2="1"
      />
      <line x1="1" y1="1"
        x2="16" y2="16"
      />
    </svg>
  )
}

CloseButton.propTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func
}

CloseButton.defaultProps = {
  customClass: ''
}

export default CloseButton
