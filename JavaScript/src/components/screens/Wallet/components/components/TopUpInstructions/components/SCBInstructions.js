import React from 'react'
import { View } from 'XfersComponents'
import {
  StepContainer,
  FieldContainer,
  Field
} from './BankField'
import { toCurrency } from 'UtilityFunctions'

function SCBInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />
  );
}


function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <View>
      <StepContainer
        stepOrder="01"
        stepHeader={<span>Select <strong>Transfer</strong> > <strong>Manage Payees</strong> > <strong>Local</strong> > <strong>Add New Local Payee</strong></span>}>
      </StepContainer>

      <StepContainer
        stepOrder="02"
        stepHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payees's Type" value="Interbank Payee (IBFT)" />
          <Field label="Payee Name" value={payeeName} toBeCopied />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepOrder="03"
        stepHeader={`Proceed to Transfer Funds to ${payeeName}`}>
        <FieldContainer>
          {
            //<Field label="Amount (SGD)" value={toCurrency(topUpAmount)} toBeCopied />
          }
          <Field label="Description" value={uniqueId} toBeCopied />
          <Field label="Type of Transfer" value="FAST (Fast And Secure Transfer)" />
        </FieldContainer>
      </StepContainer>
    </View>
  );
}

export default SCBInstructions
