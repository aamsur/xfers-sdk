import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function UOBInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader={<span>Select <strong>Fund Transfer</strong> > <strong>To Other SG Accounts</strong> > <strong>Add Payee</strong></span>}>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Display Name" value={payeeName} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader={<span>Proceed to <strong>Pay or Transfer</strong></span>}>
        <FieldContainer>
          {
            //<Field label="Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Comments" value={uniqueId} toBeCopied />
          <Field label="Purpose" value="Other" />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default UOBInstructions
