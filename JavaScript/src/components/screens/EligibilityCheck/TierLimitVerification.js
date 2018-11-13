import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  Button,
  Checklist,
  FooterButtonGroup
} from 'XfersComponents'

export default class TierLimitVerification extends Component {

  constructor(props) {
    super(props);
    this.state = { showExample: false }
  }

  toggleToExamplePage = () => {
    this.setState({ showExample: !this.state.showExample });
  }

  render() {
    const {
      closeModal,
      goNext,
      goBack,
    } = this.props;
    const { showExample } = this.state;

    return (
      <StickyPanel showBrand>
        <ModalHeader onClose={closeModal} spHeader title="Identity Verification">
          <Text spHeader>Increase Tier Limit</Text>
          <Text spBody textAlign="center">Submit Supporting Documents</Text>
        </ModalHeader>
        <View spBody>
          { showExample ? <SelfieCollection /> : <VerificationIndex /> }
        </View>

        { showExample &&
          <FooterButtonGroup spFooter>
            <Button onClick={this.toggleToExamplePage}>Back</Button>
            <Button type="primary" onClick={goNext}>Proceed</Button>
          </FooterButtonGroup>
        }

        { !showExample &&
          <FooterButtonGroup spFooter>
            <Button onClick={goBack}>Later</Button>
            <Button type="primary" onClick={this.toggleToExamplePage}>Proceed</Button>
          </FooterButtonGroup>
        }
      </StickyPanel>
    )
  }
}

class VerificationIndex extends Component {
  render() {
    return (
      <View>
        <Text type="panelTitle">
          In order to increase your transaction limit, please proceed to verify your account with Xfers. Having a verified account will activate the following features:
        </Text>
        <View>
          <Checklist title="Increase holding limit of SGDxxx.xx" />
        </View>
      </View>
    )
  }
}

class SelfieCollection extends Component {
  render() {
    return (
      <View>
        <Text type="panelTitle">
          To Increase your tier limits, please submit the following verification:
        </Text>
        <View>
          <Text type="boldValue">A selfie of yourself holding:</Text>
          <ol>
            <li>Your NRIC</li>
            <li>A paper with today's date (DD/MM/YYYY)</li>
          </ol>
          <br/>
          <Text type="blur">Example</Text>
          <View><img /></View>
        </View>
      </View>
    );
  }
}
