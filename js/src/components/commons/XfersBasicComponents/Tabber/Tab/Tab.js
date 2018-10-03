import React from 'react'
import cx from 'classnames'
import classes from './Tab.scss'

function Tab({previousTab, nextTab, label, children}) {
  return React.cloneElement(
    children,
    {
      label,
      goBack: previousTab,
      goNext: nextTab
    })
}

export default Tab
