import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'

import {FormLabel} from 'XfersBasicComponents'
import {toCurrency} from 'UtilityFunctions'

function CITIInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Manage Payee List</strong> > <strong>Add Payee</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Payee Type" value="Electronic Transfers (FAST)" />
          <Field label="Payee Name" value={payeeName} />
          <Field label="BIC Code" value={`${bankName} (${abbreviation})`} />
          <Field label="Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={<span>Select <strong>Make A Payment & Transfer</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Amount in SGD" value={toCurrency(topUpAmount)} />
          <Field label="Message" value={uniqueId} />
          <Field label="Purpose" value="OTHER"/>
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
          <Field label="Payee Name" value={payeeName} />
          <Field label="BIC Code" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={`Make Payment/Transfer to ${payeeName}`}>
        <FieldContainer>
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Transfer Type" value="FAST Transfer" />
          <Field label="MESSAGE" value={uniqueId} />
          <Field label="Purpose of Transfer*" value="OTHER" />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default CITIInstructions
