import React, { Component } from 'react'
import {
  View,
  Text,
  SelectionButton
} from 'XfersComponents'
import bankIcon from 'icons/Bank_Acc_23.png'
import trashIcon from 'icons/Trash_25.png'

export class VerifiedBankSelection extends Component {
  render() {
    const { bank, navigateToDeleteConfirmation } = this.props;
    return (
      <SelectionButton image={bankIcon}>
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
      </SelectionButton>
    )
  }
}

export class RejectedBankSelection extends Component {
  render() {
    const { bank, navigateToDeleteConfirmation } = this.props;
    return (
      <View marginTop="8px">
        <SelectionButton disabled image={bankIcon}>
          <View>
            <View float="left">
              {`${bank.bank_abbrev} - ${bank.account_no} (${bank.verification_status.charAt(0).toUpperCase()}${bank.verification_status.substr(1)})`}
            </View>
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
        </SelectionButton>
        <View marginTop="8px">
          <Text type="blur">Your bank account has been rejected. Please delete it and add a bank account with accurate details and documents.</Text>
        </View>
      </View>
    )
  }
}

export class PendingBankSelection extends Component {
  render() {
    const { bank } = this.props;
    return (
      <View marginTop="8px">
        <SelectionButton disabled image={bankIcon}>
          <View>
            <View float="left">
              {`${bank.bank_abbrev} - ${bank.account_no} (${bank.verification_status.charAt(0).toUpperCase()}${bank.verification_status.substr(1)})`}
            </View>
          </View>
        </SelectionButton>
        <View marginTop="8px">
          <Text type="blur">Your bank account is still pending verification. Please allow 7 working days for the account to be processed.</Text>
        </View>
      </View>
    )
  }
}
