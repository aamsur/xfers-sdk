import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import cls from './StepperHeader.scss'

import {StepperHeaderItem, FlexItem, FlexContainer} from './StepperHeaderItem'

const componentPropTypes = {
  customClass: PropTypes.string,
}

const componentDefaultProps = {
  customClass: '',
}

function StepperHeader({customClass, children}) {
  const count = React.Children.count(children);
  return (
    <FlexContainer customClass={cls.stepperHeaderContainer}>
      {count == 1 && <Item customClass={customClass} eleNode={children} />}
      {count >= 2 && children.map((ele, index) => {
        if (ele) return <Item key={index} customClass={customClass} eleNode={ele} />
      })}
    </FlexContainer>
  );
}

function Item({customClass, eleNode}) {
  return (
    <FlexItem evenGrowth customClass={customClass}>
      {eleNode}
    </FlexItem>
  );
}

StepperHeader.propTypes = componentPropTypes;
StepperHeader.defaultProps = componentDefaultProps;

export default StepperHeader
