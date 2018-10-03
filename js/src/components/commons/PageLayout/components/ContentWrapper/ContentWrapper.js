import cls from './ContentWrapper.scss'

export default function ContentWrapper({pageTitle, children}) {
  return (
    <div className={cls.contentWrapper}>
      <div className={cls.pageTitle}>
        <span>{pageTitle}</span>
      </div>
      {children}
    </div>
  )
}
