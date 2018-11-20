import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function CIMBInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader="Transfer via FAST to Other Bank">
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Beneficiary Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Beneficiary Name" value={payeeName} toBeCopied />
          {
            //<Field label="Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Message to Recipient" value={uniqueId} toBeCopied />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default CIMBInstructions
