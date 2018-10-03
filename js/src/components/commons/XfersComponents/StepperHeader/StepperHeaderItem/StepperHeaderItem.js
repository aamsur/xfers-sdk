import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import cls from './StepperHeaderItem.scss'

import { FlexItem, FlexContainer } from 'XfersComponents'

const componentPropTypes = {
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
  active: PropTypes.bool,
  customClass: PropTypes.string,
}

const componentDefaultProps = {
  label: '',
  active: false,
  customClass: '',
}

function StepperHeaderItem({
  label,
  state,
  image,
  disabledImage,
  active,
  states,
  multiple,
  customClass
}) {

  if (!state && multiple) {
    state = states.reduce((a,v) => a || v.state, false);
  }

  let borderWidth = state || active ? 100 : 0;
  if (multiple) {
    const seg = 100 / states.length;
    borderWidth = states.reduce((a,v) => v.state ? (a + seg) : a, 0)
  }

  const stateClass = active ? cls.active :
                     state && !active ? cls.inactive :
                     cls.disabled;

  const finalClasses = cx(customClass, stateClass, cls.stepperHeaderItem);
  return (
    <div className={finalClasses}>
      <div className={cls.imageContainer}><img src={!state && !active ? disabledImage : image} /></div>
      <span>{label}</span>
      <div className={cls.borderContainer}>
        <span
          className={cls.borderFilled}
          style={{width: `${borderWidth}%`}}
          ></span>
      </div>
    </div>
  );
}

StepperHeaderItem.propTypes = componentPropTypes;
StepperHeaderItem.defaultProps = componentDefaultProps;

export default StepperHeaderItem
