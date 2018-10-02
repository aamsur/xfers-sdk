import React from 'react'
import cx from 'classnames'
import classes from './Step.scss'

function Step({previousStep, nextStep, label, children}) {
  return React.cloneElement(
    children,
    {
      label,
      goNext: nextStep,
      goBack: previousStep
    })
}

export default Step
