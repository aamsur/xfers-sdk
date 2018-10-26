import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  SelectionButton,
  FooterButtonGroup,
  Button,
  CenterContent
} from 'XfersComponents'
import bankIcon from 'icons/Bank_Acc_23.png'

export default class BankAccountIndex extends Component {
  render() {

    const { userBanks, navigate, closeModal, goBackPreviousModule } = this.props;
    const userBankExist = userBanks.length ? true : false;

    return (
      <StickyPanel showBrand>
        { goBackPreviousModule ?
          <ModalHeader spHeader onBack={goBackPreviousModule} title="Bank Accounts" />
          :
          <ModalHeader spHeader onClose={closeModal} title="Bank Accounts" />
        }

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
            <Button type="primary" onClick={() => navigate('new')}>Add bank account</Button>
          </FooterButtonGroup>
        }

        { !userBankExist &&
          <View spBody paddingTop="40px">
            <CenterContent>
              <Button block type="primary" onClick={() => navigate('new')}>Add bank account</Button>
            </CenterContent>
          </View>
        }
      </StickyPanel>
    )
  }
}
