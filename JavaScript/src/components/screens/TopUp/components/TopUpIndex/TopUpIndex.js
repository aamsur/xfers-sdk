import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { initializeComponent, navigate, closeModal } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),
    navigateToPage: () => dispatch(navigate('topUpForm'))
  }
}

class BankAccountIndex extends Component {

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
        <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
          <View spBody>
            <CenterContent>
              <PageLoader />
            </CenterContent>
          </View>
      </StickyPanel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountIndex)
