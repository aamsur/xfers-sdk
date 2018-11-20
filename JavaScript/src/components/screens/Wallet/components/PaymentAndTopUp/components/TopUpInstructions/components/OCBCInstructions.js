import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function OCBCInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader={<span>Select <strong>Transfer funds</strong> > <strong>Add Payee</strong></span>}>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee's name" value={payeeName} toBeCopied />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader={`Proceed to Transfer Funds to ${payeeName}`}>
        <FieldContainer>
          <Field label="When to transfer?" value="Transfer Now" />
          <Field label="Purpose Code" value="Other" />
          <Field label="Payment description (Enter your mobile number here)" value={uniqueId} toBeCopied />
          {
            //<Field label="Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default OCBCInstructions
