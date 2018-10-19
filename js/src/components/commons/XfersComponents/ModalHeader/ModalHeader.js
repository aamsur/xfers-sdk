import React from 'react'
import PropTypes from 'prop-types'
import cls from './ModalHeader.scss'
import { View, Text, FlexContainer, FlexItem } from 'XfersComponents'

import closeIcon from 'icons/Close_16.png'
import backIcon from 'icons/Back_16.png'

const componentPropTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
}

function ModalHeader({title, children, onBack, onClose}) {
  return (
    <View customClass={cls.modalHeader}>
      <View customClass={cls.title}>
        { onBack && <img src={backIcon} onClick={onBack} /> }
        { onClose && <img src={closeIcon} onClick={onClose} /> }
        <Text type="modalHeader">{title}</Text>
      </View>

      { children && <View customClass={cls.desc}>{children}</View> }
    </View>
  )
}

ModalHeader.propTypes = componentPropTypes;

export default ModalHeader
