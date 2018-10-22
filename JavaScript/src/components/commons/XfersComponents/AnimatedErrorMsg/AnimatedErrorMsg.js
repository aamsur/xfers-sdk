import React from 'react'
import cls from './AnimatedErrorMsg.scss'
import cx from 'classnames'

export default function AnimatedErrorMsg({showError, errorMsg, highlightError}) {
  return (
    <p className={cx("text-danger", cls.AnimatedErrorMsg, {[cls.highlightError]: highlightError})}>
      {showError && errorMsg}
    </p>
  )
}