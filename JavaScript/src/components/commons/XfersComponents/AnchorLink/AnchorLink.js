import React from 'react'
import cx from 'classnames'
import cls from './AnchorLink.scss'

export default function AnchorLink({onClick, href, target, className, children, style}) {
  return (
    <a className={cx(cls.anchorLink, className)} style={style} onClick={onClick} href={href} target={target ? "_blank" : ""}>
      {children}
    </a>
  )
}
