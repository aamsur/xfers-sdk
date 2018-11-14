import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  SelectionButton,
  FooterButtonGroup,
  Button,
  Text,
} from 'XfersComponents'
import { VerifiedBankSelection, PendingBankSelection, RejectedBankSelection } from './components'

export default class BankAccountIndex extends Component {
  render() {
    const { verifiedBanks, nonVerifiedBanks, navigate, closeModal, params, selectBankForAction } = this.props;

    const navigateToDeleteConfirmation = (bankId) => {
      selectBankForAction(bankId);
      navigate("delete")
    }

    return (
      <StickyPanel showBrand>
        { params.goBackPreviousModule ?
          <ModalHeader spHeader onBack={params.goBackPreviousModule} title="Bank Accounts" />
          :
          <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
        }
        <View spBody paddingTop="40px">
          { verifiedBanks.map((bank, index) => <VerifiedBankSelection bank={bank} key={index} navigateToDeleteConfirmation={navigateToDeleteConfirmation} />) }
          { nonVerifiedBanks.map((bank, index) => {
            if (bank.verification_status === "pending") return (<PendingBankSelection bank={bank} key={index} />);
            return (<RejectedBankSelection bank={bank} key={index} navigateToDeleteConfirmation={navigateToDeleteConfirmation} />);
          })}
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={() => navigate('new')}>Add bank account</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
