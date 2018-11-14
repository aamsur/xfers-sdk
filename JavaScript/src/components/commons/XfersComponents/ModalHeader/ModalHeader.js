import React from 'react'
import PropTypes from 'prop-types'
import cls from './ModalHeader.scss'
import { View, Text, FlexContainer, FlexItem } from 'XfersComponents'

import closeIcon from 'icons/Close_16.png'
import backIcon from 'icons/Back_16.png'

function ModalHeader({title, children, onBack, onClose }) {
  const { subHeading, desc } = processElements(children);
  return (
    <View customClass={cls.modalHeader}>
      <View customClass={cls.title}>
        { onBack && <img src={backIcon} onClick={onBack} /> }
        { onClose && <img src={closeIcon} onClick={onClose} /> }
        <Text type="modalHeader">{title}</Text>
      </View>

      { (subHeading || desc) &&
        <View customClass={cls.modalHeaderBody}>
          { subHeading && <View customClass={cls.subHeading}>{subHeading}</View> }
          { desc && <View customClass={cls.desc}>{desc}</View> }
        </View>
      }
    </View>
  )
}

function processElements(children) {

  if ( !children ) return {};
  if ( !children.length ) {
    if (children.props.spHeader) return { subHeading: children };
    if (children.props.spBody) return { desc: children };
  }

  // If subHeading & desc are passed as children in an array, process the elements;
  let subHeading, desc;
  for ( let i = 0; i < children.length; i++ ) {
    subHeading = (children[i] && children[i].props.spHeader) ? children[i] : subHeading;
    desc = (children[i] && children[i].props.spBody) ? children[i] : desc;
  }
  return { subHeading, desc }
}

const componentPropTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

ModalHeader.propTypes = componentPropTypes;

export default ModalHeader
