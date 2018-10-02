import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class VisibilityController extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibilityState: props.visibilityState };
  }

  toggleVisibility(event) {
    event.preventDefault();
    const {onShow, onHide} = this.props;
    const nextState = !this.state.visibilityState;
    if (nextState) {
      if (onShow) { onShow(); }
    } else {
      if (onHide) { onHide(); }
    }
    this.setState({visibilityState: nextState});
  }

  renderShowControlNode = () => {
    const {showControlNode} = this.props;
    let showDOM = (
      <a href="#" className={cls.showControl} onClick={this.toggleVisibility}>
        <img src={showIcon} alt="" />
        <span>Show Content</span>
      </a>
    );

    if (showControlNode) {
      showDOM = (
        <a href="#" className={cls.showControl} onClick={this.toggleVisibility}>
          {showControlNode}
        </a>
      )
    }
    return showDOM;
  }

  renderHideControlNode = () => {
    const {hideControlNode} = this.props;
    let hideDOM = (
      <a href="#" className={cls.hideControl} onClick={this.toggleVisibility}>
        <img src={hideIcon} alt="" />
      </a>
    );

    if (hideControlNode) {
      hideDOM = (
        <a href="#" className={cls.hideControl} onClick={this.toggleVisibility}>
          {hideControlNode}
        </a>
      )
    }
    return hideDOM;
  }

  render() {
    const {content, customClass} = this.props;

    const visibilityControllerClass = cx(cls.visibilityControllerClass, customClass);

    const showControlNode = this.renderShowControlNode();
    const hideControlNode = this.renderHideControlNode();

    return (
      <div className={visibilityControllerClass}>
        {visibilityState ?
          <div>
            {hideControlNode}
            {content}
          </div>
          :
          <div>{showControlNode}</div>
        }
      </div>
    );
  }
}

const XfersPropTypes = {
  showIcon: PropTypes.string.isRequired,
  hideIcon: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  showControlNode: PropTypes.node,
  hideControlNode: PropTypes.node,
  content: PropTypes.node,
  visibilityState: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
}

const XfersDefaultProps = {
  className: '',
  visibilityState: false,
}

VisibilityController.propTypes = XfersPropTypes;
VisibilityController.defaultProps = XfersDefaultProps;

export default VisibilityController
