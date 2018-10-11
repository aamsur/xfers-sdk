import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cls from './SelectionButton.scss'
import cx from 'classnames'

import { View, TwoColsRowBar } from 'XfersComponents'

const componentPropTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.number,
  disabled: PropTypes.bool,
}

const componentDefaultProps = {
  customClass: '',
  disabled: false,
};

function SelectionButton({ title, subtitle, image, disabled, onClick }) {
  return (
    <View className={cls.selectionButton}>
      <TwoColsRowBar
        noBottomMargin
        leftColProps={{
          xSize: { sm: 4, md: 3 },
          content: <img className={cls.image} src={image} />
        }}
        rightColProps={{
          content: <div>{title}</div>
        }}
      />
    </View>
  )
}

SelectionButton.propTypes = componentPropTypes;
SelectionButton.defaultProps = componentDefaultProps;

export default SelectionButton
