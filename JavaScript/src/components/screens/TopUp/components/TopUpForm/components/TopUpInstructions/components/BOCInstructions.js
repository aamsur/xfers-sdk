import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function BOCInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <div>
      <StepContainer
        stepOrder="01"
        stepHeader={<span>Select <strong>Payee Management</strong> > <strong>New Payee</strong> > <strong>Domestic Transfer</strong></span>}>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Name of Payee's Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Payee's Name" value={payeeName} toBeCopied />
          <Field label="Payee's Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader={<span>Select <strong>Transfer & Remittance</strong> and enter these details accurately</span>}>
        <FieldContainer>
          {
            //<Field label="Pay-out Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Transfer Method" value="FAST Transfer" />
          <Field label="Purpose of Transfer" value="Other" />
          <Field label="Abstract" value={uniqueId} toBeCopied />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default BOCInstructions
