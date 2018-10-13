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
    <View className={cls.modalHeader}>
      <View className={cls.title} textAlign='center'>
        {title}
      </View>
      { children && <View className={cls.desc}>{children}</View> }
    </View>
  )
}

ModalHeader.propTypes = componentPropTypes;

export default ModalHeader
