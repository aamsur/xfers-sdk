import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'


function MBBInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <div>
      <StepContainer
        stepOrder="01"
        stepHeader="Make a Funds Transfer to Another Bank via FAST">
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Nickname" value={payeeName} toBeCopied />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          {
            //<Field label="Transfer Amount" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Transaction Details" value={uniqueId} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader="Keep the screenshot of the transfer as this will help us expedite your issue (if any) when you require support assistance.">
      </StepContainer>
    </div>
  );
}

export default MBBInstructions
