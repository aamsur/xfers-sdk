import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { initializeComponent, navigate } from 'Payment/actions'

function mapStateToProps({payment}, props) {
  return {...props}
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),
    navigateToPage: () => dispatch(navigate('payment'))
  }
}

class PaymentIndex extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const callback = () => {
      this.props.navigateToPage();
    }
    this.props.init(callback);
  }

  render() {

    const { closeModal } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Make Payment" />
          <View spBody>
            <CenterContent>
              <PageLoader />
            </CenterContent>
          </View>
      </StickyPanel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentIndex)
