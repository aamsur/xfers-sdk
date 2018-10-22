import React from 'react'
import PropTypes from 'prop-types'
import cls from '../Instructions.scss'

import {CopyBox} from 'XfersBasicComponents'

const stepComponentPropTypes = {
  stepHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  stepSubHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.node
}

export function StepContainer({stepHeader, stepSubHeader, children}) {
  return (
    <div className={cls.stepContainerComponent}>
      <div className={cls.stepHeaderContainer}>
        <div className={cls.stepHeader}>{stepHeader}</div>
        <div className={cls.stepSubHeader}>{stepSubHeader}</div>
      </div>
      {children}
    </div>
  );
}

StepContainer.propTypes = stepComponentPropTypes;

export function FieldContainer({children}) {
  return (
    <div className={cls.fieldContainerComponent}>
      {children}
    </div>
  );
}

export function Field({label, value, toBeCopied}) {
  return (
    <div className={cls.fieldComponent}>
      <p className={cls.fieldLabel}>{label}</p>
      {toBeCopied ? <CopyBox customClass={cls.copyBox} valueToBeCopied={value} /> :
        <div className={cls.fieldBox}>{value}</div>
      }
    </div>
  );
}

export function FieldImage({image}) {
  return (
    <div className={cls.fieldImage}>
      <img src={image} />
    </div>
  )
}
