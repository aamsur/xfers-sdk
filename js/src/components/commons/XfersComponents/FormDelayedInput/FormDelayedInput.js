import React from 'react'
import PropTypes from 'prop-types'
import cls from './FormDelayedInput.scss'

import {FormInput} from 'XfersComponents'

const componentPropTypes = {
  delay: PropTypes.number,
  customClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  caption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

const componentDefaultProps = {
  delay: 500,
  disabled: false,
  customClass: '',
  type: 'text',
  value: '',
}

class FormDelayedInput extends React.Component {
  constructor() {
    super();
    this.timer = null;
  }
  handleChange = (event) => {
    const {onChange, onExecute, delay} = this.props;

    clearTimeout(this.timer);
    onChange(event);
    this.timer = setTimeout(() => {
      onExecute(event);
    }, delay);
  }

  render() {
    const {type, value, placeholder, caption} = this.props;
    return (
      <div className={cls.searchField}>
        <FormInput
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          caption={caption}
        />

      </div>
    );
  }
}

FormDelayedInput.propTypes = componentPropTypes;
FormDelayedInput.defaultProps = componentDefaultProps;

export default FormDelayedInput
