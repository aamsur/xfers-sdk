import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './CenterContent.scss'

class CenterContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: ''
    }
  }

  componentDidMount() {
    let style = window.getComputedStyle(this.element.parentElement);
    let eleHeight = this.element.parentElement.offsetHeight;
    eleHeight -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

    this.setState({height: eleHeight});
  }

  render() {
    const {children, customClass, noDynamicHeight} = this.props;
    let style = {height: this.state.height};
    if (noDynamicHeight) style = {};
    return (
      <div ref={(ele) => { this.element = ele; }}
        className={cx(classes.centerAligned, customClass)}
        style={style}>
        {children}
      </div>
    )
  }
}

export default CenterContent
