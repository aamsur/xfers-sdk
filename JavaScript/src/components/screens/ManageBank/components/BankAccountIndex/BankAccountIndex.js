import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  SelectionButton,
  FooterButtonGroup,
  Button,
  Text,
  TwoColsRowBar,
  CenterContent,
  AnchorLink
} from 'XfersComponents'
import bankIcon from 'icons/Bank_Acc_23.png'
import trashIcon from 'icons/Trash_25.png'
import documentIcon from 'icons/Document_50.png'

export default class BankAccountIndex extends Component {
  render() {
    const { userBanks, navigate, closeModal, isIndo, params, selectBankForAction } = this.props;
    const userBankExist = userBanks.length ? true : false;

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

        { userBankExist &&
          <View spBody paddingTop="40px">
            { userBanks.map((bank, index) =>
              <SelectionButton
                key={index}
                image={bankIcon}
                title={(
                  <View>
                    <View float="left">{`${bank.bank_abbrev} - ${bank.account_no}`}</View>
                    <View float="right">
                      <img
                        src={trashIcon}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "25px",
                          cursor: 'pointer',
                        }}
                        onClick={() => navigateToDeleteConfirmation(bank.id)}
                      />
                    </View>
                  </View>
                )}
                />
            )}
          </View>
        }

        { userBankExist &&
          <FooterButtonGroup spFooter>
            <Button type="primary" onClick={() => navigate('new')}>Add bank account</Button>
          </FooterButtonGroup>
        }

        { (!userBankExist && isIndo) &&
          <View spBody paddingTop="40px">
            <CenterContent>
              <Button block type="primary" onClick={() => navigate('new')}>Add bank account</Button>
            </CenterContent>
          </View>
        }

        { (!userBankExist && !isIndo) &&
          <View spBody>
            <Text type="panelTitle">Please prepare the following documents for verification of your bank account</Text>
            <TwoColsRowBar
              noBottomMargin
              leftColProps={{
                size: { sm: 3, md: 2 },
                content: <img src={documentIcon} />
              }}
              rightColProps={{
                content: (
                  <View>
                    <Text type="boldValue">Bank Statement</Text>
                    <View margin="8px 0"><Text fontWeight="500">A Valid Bank Statement includes:</Text></View>

                    <ol style={{paddingLeft: "15px"}}>
                      <li>Bank Logo</li>
                      <li>Statement of Account</li>
                      <li>Date</li>
                      <li>Name and Address</li>
                      <li>Account Number</li>
                      <li>Footer</li>
                    </ol>
                    <View><Text>Please ensure document was issued within the last 3 months.</Text></View>
                    <br/>
                    <View><AnchorLink href="https://xfershelp.zendesk.com/hc/en-us/articles/360002335071" target>Don't have a bank statement?</AnchorLink></View>
                    <br/>
                    <Text type="blur">You may choose to hide or blur out any optional information but cropping of document is strictly not allowed.</Text>
                  </View>
                )
              }}
            />
          </View>
        }

        { (!userBankExist && !isIndo) &&
          <FooterButtonGroup spFooter>
            <Button type="primary" onClick={() => navigate('new')}>Add bank account</Button>
          </FooterButtonGroup>
        }
      </StickyPanel>
    )
  }
}
