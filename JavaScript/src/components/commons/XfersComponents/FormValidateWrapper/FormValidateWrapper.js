import React from 'react'

export default function FormValidateWrapper(WrappedComponent, validatorFns) {
  const {getFieldValidator, formValidity} = validatorFns;
  return class FormValidateWrapperHOC extends React.Component {
    state = { showErrors: false };
    toggleShowErrors = () => this.setState({ showErrors: true });

    render() {
      return <WrappedComponent
        toggleShowErrors={this.toggleShowErrors}
        getFieldValidator={(key)=>(this.state.showErrors && getFieldValidator(key))}
        formValidity={formValidity}
        {...this.props}
        />
    }
  }
}
