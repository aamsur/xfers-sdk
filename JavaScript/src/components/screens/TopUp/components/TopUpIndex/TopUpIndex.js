import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  ModalHeader,
  View,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { initializeComponent, navigate } from 'TopUp/actions'

function mapStateToProps({topUp}, props) {
  const { closeModal } = topUp;
  return { closeModal }
}

function mapDispatchToProps(dispatch) {
  return {
    init: (successCallback) => dispatch(initializeComponent(successCallback)),
    navigateToPage: () => dispatch(navigate('topUpForm'))
  }
}

class TopUpIndex extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(TopUpIndex)
