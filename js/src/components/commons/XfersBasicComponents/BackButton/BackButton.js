import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import classes from './BackButton.scss'

const BackButton = ({customClass, onClick}) => {

  const backBtnClass = cx(customClass, classes.backBtn)

  return (
    <svg className={backBtnClass} onClick={onClick}>
      <line x1="1" y1="8"
        x2="16" y2="16"
      />
      <line x1="1" y1="8"
        x2="16" y2="1"
      />
    </svg>
  )
}

BackButton.propTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func
}

BackButton.defaultProps = {
  customClass: ''
}

export default BackButton
