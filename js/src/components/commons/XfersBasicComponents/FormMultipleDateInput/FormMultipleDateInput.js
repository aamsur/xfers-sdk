import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import calendarIcon from 'icons/black_icons/Calendar_Black.png'
import cx from 'classnames';
import cls from './FormMultipleDateInput.scss'
import DatePicker from 'react-datepicker'
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'

import {
  FormGroup,
  FormInput
} from 'XfersBasicComponents'


const START_DATE_FORMAT = 'DD MMM YY';
const END_DATE_FORMAT = 'DD MMM YY'

const componentPropTypes = {
  noFuture: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // recieves (dateObj, name) if valid date, else null
  customClass: PropTypes.string
}

class FormMultipleDateInput extends React.Component {

  static defaultProps = {
    startDate: moment().subtract(30, 'days'),
    endDate: moment()
  }

  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate && moment(props.startDate),
      endDate: props.endDate && moment(props.endDate)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate) {
      this.setState({
        startDate: moment(nextProps.startDate),
        endDate: moment(nextProps.endDate)
      });
    }
  }

  handleBlur = (date) => {
    const {onChange} = this.props;
    const {startDate, endDate} = this.state;
    if (onChange) onChange({startDate, endDate});
  }

  handleStartDateChange = (date) => {
    const dateArg = date && date.isValid() ? date : null;
    this.setState({ startDate: dateArg });
    this.dateEndPicker.onInputClick();
  }

  handleEndDateChange = (date) => {
    const {onChange} = this.props;
    const {startDate} = this.state;
    const dateArg = date && date.isValid() ? date : null;
    this.setState({ endDate: dateArg });
    if (onChange) onChange({startDate, endDate: dateArg});
  }

  render() {

    const {startDate, endDate} = this.state;
    const {customClass} = this.props;

    return (
      <div className={cx(customClass, cls.datePickerContainerClass)}>
        <span className={cls.icon}><img src={calendarIcon} /></span>

        <DatePicker
          ref={(picker) => this.dateStartPicker = picker}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          monthsShown={2}
          dateFormat={START_DATE_FORMAT}
          selected={startDate}
          onBlur={this.handleBlur}
          onSelect={this.handleStartDateChange}
          customInput={<CustomInput validator={this.props.validator} helpBlock={this.props.helpBlock}/>}
        />

      <span className={cls.icon}>-</span>

        <DatePicker
          ref={(picker) => this.dateEndPicker = picker}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          monthsShown={2}
          dateFormat={END_DATE_FORMAT}
          selected={endDate}
          onBlur={this.handleBlur}
          onSelect={this.handleEndDateChange}
          customInput={<CustomInput validator={this.props.validator} helpBlock={this.props.helpBlock}/>}
        />


      </div>
    );
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

FormMultipleDateInput.PropTypes = componentPropTypes;

export default FormMultipleDateInput
