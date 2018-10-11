import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import scbImage1 from 'instructionImages/desktop/Instruct_SCB_1.png'
import scbImage2 from 'instructionImages/desktop/Instruct_SCB_2.png'

import {FormLabel} from 'XfersBasicComponents'
import {toCurrency} from 'UtilityFunctions'

function SCBInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Manage Payees</strong> > <strong>Local</strong> > <strong>Add New Local Payee</strong>. Enter these details accurately into the fields</span>}>
        <FieldImage image={scbImage1} />
        <FieldImage image={scbImage2} />
        <FieldContainer>
          <Field label="Payee Type" value="Interbank Payee (IBFT)" />
          <Field label="Payee Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Name (as per bank's record)" value={payeeName} />
          <Field label="Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={<span>Select <strong>Transfer</strong> > <strong>To Local Account</strong> > <strong>FAST</strong> > <strong><u>{payeeName}</u></strong></span>}>
        <FieldContainer>
          <Field label="Type of Transfer" value="FAST (Fast And Secure Transfer)" />
          <Field label="Purpose of Transfer" value="OTHR Other" />
          <Field label="Amount" value={toCurrency(topUpAmount)} />
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
        stepSubHeader={<span>Select <strong>Transfer</strong> > <strong>Manage Payees</strong> > <strong>Local</strong> > <strong>Add New Local Payee</strong></span>}>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payees's Type" value="Interbank Payee (IBFT)" />
          <Field label="Payee Name" value={payeeName} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={`Proceed to Transfer Funds to ${payeeName}`}>
        <FieldContainer>
          <Field label="Amount (SGD)" value={toCurrency(topUpAmount)} />
          <Field label="Description" value={uniqueId} />
          <Field label="Type of Transfer" value="FAST (Fast And Secure Transfer)" />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default SCBInstructions
