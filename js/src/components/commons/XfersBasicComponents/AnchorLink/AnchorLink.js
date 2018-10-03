import React from 'react'
import cx from 'classnames'
import cls from './AnchorLink.scss'

export default function AnchorLink({onClick, href, target, className, children}) {
  return (
    <a className={cx(cls.anchorLink, className)} onClick={onClick} href={href} target={target ? "_blank" : ""}>
      {children}
    </a>
  )
}
