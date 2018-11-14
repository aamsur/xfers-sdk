import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function HSBCInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader={<span><strong>Add New Payee</strong> and enter these details accurately</span>}>
        <FieldContainer>
          <Field label="Name" value={payeeName} toBeCopied />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Bank Name" value={`${bankName} (${abbreviation})`} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader={`Proceed to make a FAST Transfer to ${payeeName}`}>
        <FieldContainer>
          {
            //<Field label="SGD" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Transfer On" value="NOW" />
          <Field label="Optional Notes" value="-" />
          <Field label="Beneficiary Notes" value={uniqueId} toBeCopied />
          <Field label="Transfer Option" value="One time transfer" />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default HSBCInstructions
