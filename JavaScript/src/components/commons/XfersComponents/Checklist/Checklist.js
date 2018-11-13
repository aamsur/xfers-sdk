import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cls from './Checklist.scss'
import { Text, View, TwoColsRowBar } from 'XfersComponents'
import successIcon from 'icons/Status_Success_50.png'

const componentPropTypes = {
  customClass: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  image: PropTypes.string,
}

const componentDefaultProps = {
  customClass: '',
  image: successIcon
};

function Checklist({ title, image, customClass }) {
  return (
    <View customClass={cls.checklist}>
      <TwoColsRowBar
        noSidePadding
        customClass={cls.custom}
        leftColProps={{
          size: { xs: 2 },
          content: <img className={cls.image} src={successIcon} />
        }}
        rightColProps={{
          content: <Text type="boldValue">{title}</Text>
        }}
      />
    </View>
  )
}

Checklist.propTypes = componentPropTypes;
Checklist.defaultProps = componentDefaultProps;

export default Checklist
