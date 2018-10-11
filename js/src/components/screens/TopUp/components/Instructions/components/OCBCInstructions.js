import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import ocbcImage1 from 'instructionImages/mobile/Instruct_OCBC_1.png'
import ocbcImage2 from 'instructionImages/mobile/Instruct_OCBC_2.png'

import {toCurrency} from 'UtilityFunctions'

function OCBCInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Add & manage payee</strong> > <strong>Add Account</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Bank Name" value={`${bankName} (${abbreviation})`} />
          <Field label="Name (as per bank's record)" value={payeeName} />
          <Field label="Account No." value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader={<span>Select <strong>Make a transfer</strong> > <strong>to an account</strong> > <strong>to another bank account in Singapore</strong></span>}>
        <FieldContainer>
          <Field label="Transfer to" value={payeeName} />
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="When to Transfer?" value="Transfer now" />
          <Field label="Purpose of Transfer" value="Other + Add Description" />
          <Field value={uniqueId} />
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
        stepSubHeader={<span>Select <strong>Transfer funds</strong> > <strong>Add Payee</strong></span>}>
        <FieldImage image={ocbcImage1} />
        <FieldImage image={ocbcImage2} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee's name" value={payeeName} />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={`Proceed to Transfer Funds to ${payeeName}`}>
        <FieldContainer>
          <Field label="When to transfer?" value="Transfer Now" />
          <Field label="Purpose Code" value="Other" />
          <Field label="Payment description (Enter your mobile number here)" value={uniqueId} />
          <Field label="Amount (SGD)" value={toCurrency(topUpAmount)} />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default OCBCInstructions
