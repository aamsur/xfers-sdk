import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function CITIInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
          <Field label="Payee Name" value={payeeName}  toBeCopied />
          <Field label="BIC Code" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader={`Make Payment/Transfer to ${payeeName}`}>
        <FieldContainer>
          {
            //<Field label="Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Transfer Type" value="FAST Transfer" />
          <Field label="MESSAGE" value={uniqueId} toBeCopied />
          <Field label="Purpose of Transfer*" value="OTHER" />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default CITIInstructions
