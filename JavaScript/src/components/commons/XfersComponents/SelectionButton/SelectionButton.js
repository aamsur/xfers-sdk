import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cls from './SelectionButton.scss'
import cx from 'classnames'

import { View, TwoColsRowBar } from 'XfersComponents'

const componentPropTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  subtitle: PropTypes.string,
  image: PropTypes.string,
  disabled: PropTypes.bool,
}

const componentDefaultProps = {
  customClass: '',
  disabled: false,
};

function SelectionButton({ title, subtitle, image, disabled, onClick }) {

  const handleClick = () => {
    if (onClick) onClick();
  }

  const selectionButtonClass = cx({
    [cls.clickable]: onClick ? true : false,
  }, cls.selectionButton)
  
  return (
    <View customClass={selectionButtonClass} onClick={handleClick}>
      <TwoColsRowBar
        customClass={cls.custom}
        noBottomMargin
        leftColProps={{
          size: { sm: 4, md: 3 },
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
