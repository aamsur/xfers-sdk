import React from 'react'
import PropTypes from 'prop-types'
import BootstrapControlLabel from 'react-bootstrap/lib/ControlLabel'
import BootstrapHelpBlock from 'react-bootstrap/lib/HelpBlock'
import BootstrapFormControl from 'react-bootstrap/lib/FormControl'
import {FormGroup} from 'XfersBasicComponents'

import cx from 'classnames'
import classes from './FormSelect.scss'

const componentPropTypes = {
  xSize: PropTypes.oneOf([
    'small', 'large',
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  caption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  helpBlock: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      label: PropTypes.string,
      sublabel: PropTypes.string,
      disabled: PropTypes.bool
    })
  ),
  /*
   * FormGroup Props **************************
   */
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf([
    'success', 'warning', 'error', null,
  ]),
  /*
   * FormControl Props **************************
   */
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  componentClass: PropTypes.string,
  errorMessage: PropTypes.string,
};

const componentDefaultProps = {
  className: '',
  placeholder: 'Please select an option',
  options: [],
  disabled: false,
  componentClass: 'select',
  validator: false,
  value: '',
  validatorParams: null,
  helpBlock: '',
  caption: '',
  errorMessage: '',
};


function FormSelect({
  xSize,
  label,
  helpBlock,
  caption,
  className,
  controlId,
  validationState,
  options,
  popover,
  validator,
  validatorParams,
  errorMessage,
  ...formControlProps
}) {
  const isValid = validator && validator(validatorParams || formControlProps.value);

  validationState = ((validator && !isValid) || errorMessage) ? 'error' : validationState;
  const formGroupProps = {controlId, validationState, className, popover};

  helpBlock = validator && !isValid ? helpBlock : '';

  const renderOptions = (options) => {
    const placeholder = formControlProps.placeholder;
    let optionsDOM = [];
    optionsDOM.push(<option key="default" value="" disabled>{placeholder}</option>);
    options.forEach((option, index) => {
      optionsDOM.push(
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>);
    });
    return optionsDOM;
  }

  if (xSize) {
    formGroupProps.bsSize = xSize;
  }

  let labelDOM = label && (<BootstrapControlLabel>{label}</BootstrapControlLabel>);
  let captionDOM = caption && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{caption}</BootstrapHelpBlock>);
  let helpBlockDOM = helpBlock && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{helpBlock}</BootstrapHelpBlock>);
  let errorMessageDOM = errorMessage && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{errorMessage}</BootstrapHelpBlock>);

  let optionsDOM = renderOptions(options);

  // This is for FormSelect color when there is no input
  const value = formControlProps.value;
  let selectClass;
  if (value != null && value.length != 0 ) {
    selectClass = cx(classes.formSelect)
  }
  else {
    selectClass = cx(classes.formSelect, classes.formSelectNoValue)
  }

  return (
    <div className={selectClass}>
      <FormGroup {...formGroupProps}>
        {labelDOM}
        <BootstrapFormControl {...formControlProps}>
          {optionsDOM}
        </BootstrapFormControl>
        {captionDOM}
        {helpBlockDOM}
        {errorMessageDOM}
      </FormGroup>
    </div>
  );
}

FormSelect.propTypes = componentPropTypes;
FormSelect.defaultProps = componentDefaultProps;

export default FormSelect;
