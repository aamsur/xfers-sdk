import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import classes from './Button.scss';

const componentPropTypes = {
  xSize: PropTypes.oneOf([
    'xsmall', 'small', 'large', 'xlarge', null,
  ]),
  xType: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'tertiary', null,
  ]),
  customClass: PropTypes.string,
  active: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  loading: PropTypes.bool,
  loadingLabel: PropTypes.node,
  outline: PropTypes.bool,
}

const componentDefaultProps = {
  customClass: '',
  active: false,
  block: false,
  disabled: false,
  loading: false,
  outline: false,
  xType: 'default'
};

const Button = ({xType, xSize, loading, loadingLabel, outline, disabled, block, customClass, ...rest}) => {
  const buttonClass = cx({
    'btn-xlg': xSize == 'xlarge',
    [classes.buttonSmall]: xSize == 'small',
    [classes.buttonExtraSmall]: xSize == 'xsmall',
    [classes.colorDefault]: xType == 'default',
    [classes.colorPrimary]: xType == 'primary',
    [classes.colorSecondary]: xType == 'secondary',
    [classes.colorTertiary]: xType == 'tertiary',
    [classes.outline]: outline,
    [classes.block]: block,
    [classes.disabled]: disabled,
    [classes.link]: rest.href,
  },
    classes.button,
    customClass
  );

  let buttonDOM = (<BootstrapButton bsClass={buttonClass} disabled={disabled} {...rest} />);
  if (loading) {
    rest.disabled = true;
    buttonDOM = (
      <BootstrapButton bsClass={buttonClass} {...rest}>
        {loadingLabel || <LoadingSpinner outline={outline}/>}
      </BootstrapButton>
    );
  }

  return buttonDOM
}

const LoadingSpinner = (outline) => {
  const commonClass = cx(classes['sk-circle'], {[classes.outline]: outline});
  return (
    <div className={classes['sk-fading-circle']}>
      <div className={cx(classes['sk-circle1'], commonClass)}></div>
      <div className={cx(classes['sk-circle2'], commonClass)}></div>
      <div className={cx(classes['sk-circle3'], commonClass)}></div>
      <div className={cx(classes['sk-circle4'], commonClass)}></div>
      <div className={cx(classes['sk-circle5'], commonClass)}></div>
      <div className={cx(classes['sk-circle6'], commonClass)}></div>
      <div className={cx(classes['sk-circle7'], commonClass)}></div>
      <div className={cx(classes['sk-circle8'], commonClass)}></div>
      <div className={cx(classes['sk-circle9'], commonClass)}></div>
      <div className={cx(classes['sk-circle10'], commonClass)}></div>
      <div className={cx(classes['sk-circle11'], commonClass)}></div>
      <div className={cx(classes['sk-circle12'], commonClass)}></div>
    </div>
  );
}

Button.propTypes = componentPropTypes;
Button.defaultProps = componentDefaultProps;

export default Button
