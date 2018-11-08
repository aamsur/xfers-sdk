import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function DBSInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader={<span>Select <strong>Fund Transfer To Other SG Accounts</strong> > <strong>New Payee</strong></span>}>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Name" value={payeeName} toBeCopied />
          <Field label="Payee's Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader={<span>Make a <strong>Transfer to other bank</strong> and use <strong>FAST Service</strong> transfer</span>}>
        <FieldContainer>
          {
            //<Field label="Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Comment to Payee" value={uniqueId} toBeCopied />
          <Field label="When" value="Immediate" />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default DBSInstructions
