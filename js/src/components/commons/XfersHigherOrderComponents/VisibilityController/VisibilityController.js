import React from 'react'

function VisibilityController(WrappedComponent) {
  return class VisibilityControllerHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {visibilityState: props.visibilityState};
    }

    toggleVisibility = () => {
      this.setState({visibilityState: !this.state.visibilityState});
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          toggleVisibility={this.toggleVisibility}
        />
      )
    }
  }
}

export default VisibilityController
