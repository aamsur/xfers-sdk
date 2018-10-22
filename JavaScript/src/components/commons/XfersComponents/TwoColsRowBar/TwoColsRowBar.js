import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './TwoColsRowBar.scss'
import { FlexContainer, FlexItem } from 'XfersComponents'

function TwoColsRowBar({customClass, alignment, leftColProps, rightColProps, noSidePadding, noBottomMargin, isTwoPanels}) {

  const containerProps = {
    customClass,
    alignment: (!isTwoPanels || alignment) ? alignment :
               {xs: 'center', md: 'center'}
  };
  const leftCustomClass = leftColProps.customClass;
  const rightCustomClass = rightColProps.customClass;

  let leftItemClass = cx(
    leftCustomClass,
    classes.leftItem, {
      [classes.noLeftPadding]: noSidePadding,
      [classes.noBottomMargin]: noBottomMargin,
      [classes.isTwoPanels]: isTwoPanels,
    }
  )

  let rightItemClass = cx(
    rightCustomClass,
    classes.rightItem, {
      [classes.noRightPadding]: noSidePadding,
      [classes.noBottomMargin]: noBottomMargin,
      [classes.isTwoPanels]: isTwoPanels,
    }
  )

  return (
    <div className={classes.twoColsRowBar}>
      <FlexContainer {...containerProps}>
        <FlexItem evenGrowth {...leftColProps} customClass={leftItemClass} />
        <FlexItem evenGrowth {...rightColProps} customClass={rightItemClass} />
      </FlexContainer>
    </div>
  )
}


TwoColsRowBar.propTypes =  {
  noSidePadding: PropTypes.bool,
  noBottomMargin: PropTypes.bool,
  isTwoPanels: PropTypes.bool,
  customClass: PropTypes.string,
  alignment: PropTypes.shape({
    xs: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    sm: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    md: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
    lg: PropTypes.oneOf([
      'start', 'center', 'end', 'top', 'middle', 'bottom', 'between', 'around', null,
    ]),
  }),
  leftColProps: PropTypes.shape({
    content: PropTypes.node,
    customClass: PropTypes.string,
    size: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
    offset: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
    alignment: PropTypes.shape({
      xs: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      sm: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      md: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      lg: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
    }),
  }),
  rightColProps: PropTypes.shape({
    content: PropTypes.node,
    customClass: PropTypes.string,
    size: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
    offset: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
    alignment: PropTypes.shape({
      xs: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      sm: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      md: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
      lg: PropTypes.oneOf([
        'start', 'center', 'end', 'top', 'middle', 'bottom', 'first', 'last', null,
      ]),
    }),
  }),
}


TwoColsRowBar.defaultProps = {
  customClass: '',
  noSidePadding: false,
  noBottomMargin: false,
  isTwoPanels: false,
  leftColProps: {},
  rightColProps: {},
};

export default TwoColsRowBar;
