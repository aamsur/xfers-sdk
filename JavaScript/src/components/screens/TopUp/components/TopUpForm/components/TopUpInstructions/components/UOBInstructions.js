import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import uobImage1 from 'instructionImages/mobile/Instruct_UOB_1.png'
import uobImage2 from 'instructionImages/mobile/Instruct_UOB_2.png'
import uobImage3 from 'instructionImages/mobile/Instruct_UOB_3.png'
import uobDesktopImage1 from 'instructionImages/desktop/Instruct_UOB_1.png'

import {toCurrency} from 'UtilityFunctions'

function UOBInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Pay and Transfer</strong> > <strong>Transfer Funds</strong> > <strong>Add</strong></span>}>
        <FieldImage image={uobDesktopImage1} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account No." value={accountNo} toBeCopied />
          <Field label="Nickname" value={payeeName} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={<span>Select <strong>Pay and Transfer</strong> > <strong>Transfer Funds</strong> > <strong>Other Bank</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Fast Transfer" value="Yes" />
          <Field label="Purpose" value="Other" />
          <Field label="My Initials" value={uniqueId} />
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
        stepSubHeader={<span>Select <strong>Fund Transfer</strong> > <strong>To Other SG Accounts</strong> > <strong>Add Payee</strong></span>}>
        <FieldImage image={uobImage1} />
        <FieldImage image={uobImage2} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Display Name" value={payeeName} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={<span>Proceed to <strong>Pay or Transfer</strong></span>}>
        <FieldImage image={uobImage3} />
        <FieldContainer>
          <Field label="Amount" value={topUpAmount} />
          <Field label="Comments (Enter your mobile number here)" value={uniqueId} />
          <Field label="Purpose" value="Other" />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default UOBInstructions
