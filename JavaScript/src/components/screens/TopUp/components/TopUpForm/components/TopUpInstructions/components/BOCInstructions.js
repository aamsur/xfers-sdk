import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import bocImage1 from 'instructionImages/mobile/Instruct_BOC_1.png'

import {FormLabel} from 'XfersComponents'
import {toCurrency} from 'UtilityFunctions'

function BOCInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Payee Management</strong> > <strong>New Payee</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Name of Beneficiary Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Payee Name" value={payeeName} />
          <Field label="Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={<span>Select <strong>Transfer & Remittance</strong> > <strong>Other Payee from Other Banks</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Transfer Method" value="FAST" />
          <Field label="Pay-out Amount" value={toCurrency(topUpAmount)} />
          <Field label="Purpose of Transfer" value="Other"/>
          <Field label="Description" value={uniqueId} />
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
        stepSubHeader={<span>Select <strong>Payee Management</strong> > <strong>New Payee</strong> > <strong>Domestic Transfer</strong></span>}>
        <FieldImage image={bocImage1} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Name of Payee's Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Payee's Name" value={payeeName} />
          <Field label="Payee's Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={<span>Select <strong>Transfer & Remittance</strong> and enter these details accurately</span>}>
        <FieldContainer>
          <Field label="Pay-out Amount" value={toCurrency(topUpAmount)} />
          <Field label="Transfer Method" value="FAST Transfer" />
          <Field label="Purpose of Transfer" value="Other" />
          <Field label="Abstract" value={uniqueId} />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default BOCInstructions
