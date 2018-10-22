import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import dbsImage1 from 'instructionImages/mobile/Instruct_DBS_1.png'
import dbsImage2 from 'instructionImages/mobile/Instruct_DBS_2.png'
import dbsImage3 from 'instructionImages/mobile/Instruct_DBS_3.png'

import {FormLabel} from 'XfersBasicComponents'
import {toCurrency} from 'UtilityFunctions'

function DBSInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Transfer</strong> > <strong>To Other Bank Account (FAST)</strong></span>}>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FormLabel>TO</FormLabel>
        <FieldContainer>
          <Field label="Paying to" value="Add New or Select Existing Recipient" />
          <Field label="Recipient's Name" value={payeeName} />
          <Field label="Recipient's Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Recipient's Account" value={accountNo} toBeCopied />
        </FieldContainer>

        <br/><br/>

        <FormLabel>FROM</FormLabel>
        <FieldContainer>
          <Field label="Transfer Amount" value={toCurrency(topUpAmount)} />
          <Field label="Purpose of Transfer" value="OTHERS"/>
          <Field label="Comments for Recipient" value={uniqueId} />
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
        stepSubHeader={<span>Select <strong>Fund Transfer To Other SG Accounts</strong> > <strong>New Payee</strong></span>}>
        <FieldImage image={dbsImage1} />
        <FieldImage image={dbsImage2} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Name" value={payeeName} />
          <Field label="Payee's Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader={<span>Make a "Transfer to other bank" and use <strong><u>FAST</u></strong> Service transfer</span>}>
        <FieldContainer>
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Comment to Payee (Enter your mobile number here)" value={uniqueId} />
          <Field label="When" value="Immediate" />
        </FieldContainer>
        <FieldImage image={dbsImage3} />
      </StepContainer>
    </div>
  );
}

export default DBSInstructions
