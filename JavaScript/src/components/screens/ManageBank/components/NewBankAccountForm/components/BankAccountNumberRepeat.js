import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  FormInput,
  Button,
  FooterButtonGroup
} from 'XfersComponents'

export default class BankAccountNumberRepeat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      repeatedAccountNo: ''
    }
  }

  updateAccountNo = (e) => {
    this.setState({ repeatedAccountNo: e.target.value })
  }

  checkAccountNo = () => {
    const { newBankAccountDetails: { accountNo }, goNext } = this.props;
    const { repeatedAccountNo } = this.state;
    if ( accountNo === repeatedAccountNo ) {
      this.setState({error: ''});
      goNext();
      // Next Step to decide to upload bank statement for verification or not
    } else {
      this.setState({error: 'Bank account number did not match'});
    }
  }

  render() {
    const { accountNo, goBack } = this.props;
    const { repeatedAccountNo, error } = this.state;

    const disabled = repeatedAccountNo ? false : true

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <Text type="panelTitle">Re-enter your bank account number</Text>
          <FormInput
            autoFocus
            type="number"
            placeholder="e.g. 1234567890"
            value={repeatedAccountNo}
            onChange={this.updateAccountNo}
            caption="Please exclude dashes"
          />
        </View>
        <View spFooter>
          <View marginBottom="20px"><Text type="error">{error}</Text></View>
          <FooterButtonGroup spFooter>
            <Button type="primary" disabled={disabled} onClick={this.checkAccountNo}>Next</Button>
          </FooterButtonGroup>
        </View>
      </StickyPanel>
    )
  }
}
