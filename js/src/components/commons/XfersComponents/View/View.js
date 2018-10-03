import React from 'react'

function View({ children, classNames, ...style}) {
  return (
    <div classNames={classNames} style={style}>
      {children}
    </div>
  )
}

export default View
