import React from 'react'
import PropTypes from 'prop-types'
import cls from './ModalHeader.scss'
import { View } from 'XfersComponents'

const componentPropTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
}

function ModalHeader({title, children}) {
  return (
    <div className={cls.modalHeader}>
      <View textAlign='center'>
        {title}
      </View>
      <div>{children}</div>
    </div>
  )
}

ModalHeader.propTypes = componentPropTypes;

export default ModalHeader
