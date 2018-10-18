import React from 'react'
import PropTypes from 'prop-types'
import cls from './ModalHeader.scss'
import { View, Text } from 'XfersComponents'

const componentPropTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
}

function ModalHeader({title, children}) {
  return (
    <View customClass={cls.modalHeader}>
      <View customClass={cls.title}>
        <Text type="modalHeader">{title}</Text>
      </View>
      { children && <View customClass={cls.desc}>{children}</View> }
    </View>
  )
}

ModalHeader.propTypes = componentPropTypes;

export default ModalHeader
