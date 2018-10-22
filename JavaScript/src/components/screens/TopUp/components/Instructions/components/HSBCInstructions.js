import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'

import {FormLabel} from 'XfersBasicComponents'
import {toCurrency} from 'UtilityFunctions'

function HSBCInstructions({screenType, topUpAmount, xfersBankAccount}) {
  return (
    <div>
      {screenType === "desktop" ? <DesktopView topUpAmount={topUpAmount} {...xfersBankAccount} /> : <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />}
    </div>
  );
}

function DesktopView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <div>
      <StepContainer
        stepHeader="STEP 1"
        stepSubHeader={<span>Select <strong>Local Transfer/PayNow</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Transfer Via" value="FAST" />
          <Field label="Transfer To" value="Transfer to another bank in Singapore" />
          <Field label="Name" value={payeeName} />
          <Field label="Account No." value={accountNo} toBeCopied />
          <Field label="Bank Name" value={`${bankName} (${abbreviation})`} />
          <Field label="Amount in SGD" value={toCurrency(topUpAmount)} />
          <Field label="Date and Frequency" value="Transfer now"/>
          <Field label="Details for Beneficiary" value={uniqueId} />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <div>
      <StepContainer
        stepHeader="STEP 1"
        stepSubHeader={<span><strong>Add New Payee</strong> and enter these details accurately</span>}>
        <FieldContainer>
          <Field label="Name" value={payeeName} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Bank Name" value={`${bankName} (${abbreviation})`} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={`Proceed to make a FAST Transfer to ${payeeName}`}>
        <FieldContainer>
          <Field label="SGD" value={toCurrency(topUpAmount)} />
          <Field label="Transfer On" value="NOW" />
          <Field label="Optional Notes" value="-" />
          <Field label="Beneficiary Notes" value={uniqueId} />
          <Field label="Transfer Option" value="One time transfer" />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default HSBCInstructions
