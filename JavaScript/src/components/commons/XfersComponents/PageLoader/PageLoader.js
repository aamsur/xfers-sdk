import React from 'react'
import cls from './PageLoader.scss'

export default function PageLoader() {
  return (
    <div className={cls.loaderContainer}>
      <div className={cls.loader} />
    </div>
  )
}
