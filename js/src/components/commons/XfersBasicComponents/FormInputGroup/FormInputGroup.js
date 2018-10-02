import React from 'react'
import PropTypes from 'prop-types'
import BootstrapInputGroup from 'react-bootstrap/lib/InputGroup'
import BootstrapControlLabel from 'react-bootstrap/lib/ControlLabel';
import BootstrapHelpBlock from 'react-bootstrap/lib/HelpBlock';
import BootstrapFormControl from 'react-bootstrap/lib/FormControl';
import {FormGroup} from 'XfersBasicComponents'

import cx from 'classnames'
import cls from './FormInputGroup.scss'

const componentPropTypes = {
  /*
   * Xfers Props **************************
   */
  xSize: PropTypes.oneOf([
    'small', 'large',
  ]),
  className: PropTypes.string, // This classes will be applied on FormGroup Component
  label: PropTypes.string, // This label is to describe the form input
  helpBlock: PropTypes.string,
  leftAddonContent: PropTypes.node,
  rightAddonContent: PropTypes.node,
  rightAddonBtn: PropTypes.node,
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
  disabled: false,
  type: 'text',
  value: '',
  validatorParams: null,
  errorMessage: '',
}

function FormInputGroup ({
  xSize,
  label,
  helpBlock,
  caption,
  className,
  controlId,
  validator,
  validationState,
  leftAddonContent,
  rightAddonContent,
  rightAddonBtn,
  validatorParams,
  errorMessage,
  ...formControlProps
}) {

  const isValid = validator && validator(validatorParams || formControlProps.value);
  validationState = ((validator && !isValid) || errorMessage) ? 'error' : validationState;
  helpBlock = validator && !isValid ? helpBlock : '';

  const formGroupProps = {controlId, validationState, className};

  if (xSize) {
    formGroupProps.bsSize = xSize;
  }

  let labelDOM = label && (<BootstrapControlLabel>{label}</BootstrapControlLabel>);
  let captionDOM = caption && (<BootstrapHelpBlock bsClass={cx(cls.helpBlock, 'help-block')}>{caption}</BootstrapHelpBlock>);
  let helpBlockDOM = helpBlock && (<BootstrapHelpBlock bsClass={cx(cls.helpBlock, 'help-block')}>{helpBlock}</BootstrapHelpBlock>);
  let errorMessageDOM = errorMessage && (<BootstrapHelpBlock bsClass={cx(cls.helpBlock, 'help-block')}>{errorMessage}</BootstrapHelpBlock>);

  let inputGroupDOM = [];
  if (leftAddonContent) {
    inputGroupDOM.push(
      <BootstrapInputGroup.Addon key="1">
      {leftAddonContent}
      </BootstrapInputGroup.Addon>
    );
  }

  formControlProps.key = "2";
  inputGroupDOM.push(<ReactBootstrap.FormControl {...formControlProps}/>);

  if (rightAddonContent) {
    inputGroupDOM.push(
      <BootstrapInputGroup.Addon key="3">
        {rightAddonContent}
      </BootstrapInputGroup.Addon>
    );
  }

  if (rightAddonBtn) {
    inputGroupDOM.push(
      <BootstrapInputGroup.Button key="4">
        {rightAddonBtn}
      </BootstrapInputGroup.Button>
    );
  }

  return (
    <div className={cx(cls.formInputGroup)}>
      <FormGroup {...formGroupProps}>
        {labelDOM}
        <BootstrapInputGroup>
          {inputGroupDOM}
        </BootstrapInputGroup>
        {captionDOM}
        {helpBlockDOM}
        {errorMessageDOM}
      </FormGroup>
    </div>
  );
}

FormInputGroup.propTypes = componentPropTypes;
FormInputGroup.defaultProps = componentDefaultProps;

export default FormInputGroup;
