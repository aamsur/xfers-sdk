import React from 'react';
import PropTypes from 'prop-types';
import BootstrapControlLabel from 'react-bootstrap/lib/ControlLabel';
import BootstrapHelpBlock from 'react-bootstrap/lib/HelpBlock';
import BootstrapFormControl from 'react-bootstrap/lib/FormControl';
import {FormGroup} from 'XfersComponents';

import cx from 'classnames';
import classes from './FormInput.scss';

const componentPropTypes = {
  size: PropTypes.oneOf([
    'xsmall', 'small', 'large', 'xlarge', null,
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
   value: PropTypes.oneOfType([
     PropTypes.string,
     PropTypes.number,
   ]),
   defaultValue: PropTypes.oneOfType([
     PropTypes.string,
     PropTypes.number,
   ]),
   placeholder: PropTypes.string,
   onChange: PropTypes.func,
   type: PropTypes.string,
   inputRef: PropTypes.func,
   /**
    * Attaches a ref to the `<input>` element. Only functions can be used here.
    *
    * ```js
    * <FormControl inputRef={ref => { this.input = ref; }} />
    * ```
    */
   errorMessage: PropTypes.string,
}

const componentDefaultProps = {
  className: '',
  type: 'text',
  disabled: false,
  helpBlock: '',
  caption: '',
  validator: false,
  value: '',
  validatorParams: null,
  errorMessage: '',
};


function FormInput({
  validator,
  size,
  label,
  helpBlock,
  caption,
  className,
  controlId,
  validationState,
  popover,
  validatorParams,
  errorMessage,
  ...formControlProps
}) {

  const isValid = validator && validator(validatorParams || formControlProps.value);

  validationState = ((validator && !isValid) || errorMessage) ? 'error' : validationState;
  const formGroupProps = {controlId, validationState, className, popover};

  helpBlock = validator && !isValid ? helpBlock : '';

  if (size) {
    formGroupProps.bsSize = size;
  }

  let labelDOM = label && (<BootstrapControlLabel>{label}</BootstrapControlLabel>);
  let captionDOM = caption && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{caption}</BootstrapHelpBlock>);
  let helpBlockDOM = helpBlock && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{helpBlock}</BootstrapHelpBlock>);
  let errorMessageDOM = errorMessage && (<BootstrapHelpBlock bsClass={cx(classes.helpBlock, 'help-block')}>{errorMessage}</BootstrapHelpBlock>);

  return (
    <div className={cx(classes.formInput)}>
      <FormGroup {...formGroupProps}>
        {labelDOM}
        <BootstrapFormControl {...formControlProps} />
        {captionDOM}
        {helpBlockDOM}
        {errorMessageDOM}
      </FormGroup>
    </div>
  );
}

FormInput.propTypes = componentPropTypes;
FormInput.defaultProps = componentDefaultProps;

export default FormInput;
