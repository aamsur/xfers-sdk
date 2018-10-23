import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  ModalHeader,
  View,
  SelectionButton,
  FooterButtonGroup,
  Button,
  CenterContent,
  PageLoader
} from 'XfersComponents'
import { navigate, initializeComponent } from 'ManageBank/actions'

import bankIcon from 'icons/Bank_Acc_23.png'

function mapStateToProps({manageBank}, props) {
  const { dataLoading, userBanks } = manageBank;
  return { dataLoading, userBanks, ...props }
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(initializeComponent()),
    navigateToForm: () => dispatch(navigate('new'))
  }
}

class BankAccountIndex extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  render() {

    const { dataLoading, userBanks, navigateToForm, closeModal } = this.props;
    const userBankExist = userBanks.length ? true : false;

    if (dataLoading) {
      return (
        <StickyPanel showBrand>
          <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
            <View spBody>
              <CenterContent>
                <PageLoader />
              </CenterContent>
            </View>
        </StickyPanel>
      )
    } else {
      return (
        <StickyPanel showBrand>
          <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
          { userBankExist &&
            <View spBody paddingTop="40px">
              { userBanks.map((bank, index) =>
                <SelectionButton
                  key={index}
                  image={bankIcon}
                  title={`${bank.bank_abbrev} - ${bank.account_no}`}
                  onClick={() => console.log()}
                  />
              )}
            </View>
          }

          { userBankExist &&
            <FooterButtonGroup spFooter>
              <Button type="primary" onClick={navigateToForm}>Add bank account</Button>
            </FooterButtonGroup>
          }

          { !userBankExist &&
            <View spBody paddingTop="40px">
              <CenterContent>
                <Button block type="primary" onClick={navigateToForm}>Add bank account</Button>
              </CenterContent>
            </View>
          }
        </StickyPanel>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountIndex)
