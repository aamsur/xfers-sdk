import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import classes from './CopyBox.scss'
import Clipboard from 'clipboard'

const componentPropTypes = {
  valueToBeCopied: PropTypes.string,
  copyText: PropTypes.string,
  copyTextOnClicked: PropTypes.string,
}

const componentDefaultProps = {
  valueToBeCopied: '',
  copyText: 'Copy',
  copyTextOnClicked: 'Copied!',
  className: ''
}

class CopyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToBeCopied: props.valueToBeCopied,
      copyBtnText: props.copyText
    };
  }

  componentDidMount = () => {
    let clipboard = new Clipboard(this.copyButton, {
      container: document.getElementById('copyBoxContainer')
    });

    let callback = () => { this.onClickCallback(); }
    clipboard.on('success', function(e) {
      callback();
      e.clearSelection();
    });

    clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }

  onClickCallback = () => {
    const {copyTextOnClicked, copyText} = this.props;
    this.setState({copyBtnText: copyTextOnClicked});
    setTimeout(function(){
      this.setState({copyBtnText: copyText});
    }.bind(this), 2000);
  }

  render() {

    const valueToBeCopied = this.state.valueToBeCopied;
    const copyBtnText = this.state.copyBtnText;
    const customClass = this.props.customClass;

    const copyBoxClasses = cx(classes.copyBoxContainer, customClass);

    return (
      <div id="copyBoxContainer" className={copyBoxClasses}>
        <div className={classes.rowWrapper}>
          <div className={classes.showCaseBox}>{valueToBeCopied}</div>
          <a className={classes.copyBtnBox}
            ref={(input) => { this.copyButton = input; }}
            data-clipboard-text={valueToBeCopied}
            >
            {copyBtnText}
          </a>
        </div>
      </div>
    );
  }
}

CopyBox.propTypes = componentPropTypes;
CopyBox.defaultProps = componentDefaultProps;


export default CopyBox
