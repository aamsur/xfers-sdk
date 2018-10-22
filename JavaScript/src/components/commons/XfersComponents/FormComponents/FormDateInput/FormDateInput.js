import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import cx from 'classnames';
import classes from './FormDateInput.scss'
import DatePicker from 'react-datepicker'

import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
// import 'react-datepicker/dist/react-datepicker.css'
import {
  FormGroup, FormInput
} from 'XfersComponents'

const DATE_FORMAT = 'DD/MM/YYYY';

const componentPropTypes = {
  noFuture: PropTypes.bool,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // recieves (dateObj, name) if valid date, else null
  disabled: PropTypes.bool,
}

class FormDateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.value && moment(props.value),
      errorMessage: '',
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.value){
      this.setState({
        startDate: moment(nextProps.value)
      })
    }
  }

  handleChange = (date) => {
    const {onChange, name} = this.props;
    const dateArg = date && date.isValid() ? date : null;
    if (onChange) onChange(dateArg, name);
    this.setState({ startDate: dateArg });
  }

  handleChangeRaw = (e) => {
    const {onChange, name} = this.props;
    const date = new moment(e.target.value, DATE_FORMAT, true);
    const dateArg = date && date.isValid() ? date : null;
    if (onChange) onChange(dateArg, name);
    this.setState({ startDate: dateArg });
  }

  handleBlur = (e) => {
    const {onBlur} = this.props;
    const date = new moment(e.target.value, DATE_FORMAT, true);
    let errorMessage = '';
    if(e.target.value && !date.isValid()) {
      errorMessage = 'Invalid date'
    }
    this.setState({errorMessage})
    const dateArg = date && date.isValid() ? date : null;
    if(onBlur) onBlur(dateArg);
  }

  render() {

		const {placeholder, noFuture, maxDate, disabled, name, validator, helpBlock, errorMessage, onFocus} = this.props;

    let maxDateNonProps = null;
    if (noFuture) {
      maxDateNonProps = moment();
    } else if (maxDate) {
      maxDateNonProps = maxDate;
    }


    return (
      <div className={cx(classes.container)}>
        <DatePicker
          showYearDropdown
          scrollableYearDropdown
          maxDate={maxDateNonProps}
          dropdownMode="select"
          dateFormat={DATE_FORMAT}
          placeholderText={placeholder}
          selected={this.state.startDate}
          onSelect={this.handleChange}
          onChange={this.handleChange}
          onChangeRaw={this.handleChangeRaw}
          onBlur={this.handleBlur}
          onFocus={onFocus}
          disabled={disabled}
          name={name}
          customInput={<CustomInput
            validatorParams={this.state.startDate}
            validator={validator}
            helpBlock={helpBlock}
            errorMessage={this.state.errorMessage || errorMessage}
          />}
        />
        {/*{helpBlockDOM}*/}
      </div>
    )
  }
}

class CustomInput extends React.Component {
  focus = () => {
    this.formInput.focus()
  }

  render() {
    return (
      <FormInput
        inputRef={(formInput) => this.formInput = formInput}
        {...this.props}
      />
    )
  }
}

FormDateInput.propTypes = componentPropTypes;

export default FormDateInput
