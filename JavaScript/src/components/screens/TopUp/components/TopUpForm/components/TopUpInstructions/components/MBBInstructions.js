import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'
import mbbImage1 from 'instructionImages/mobile/Instruct_Maybank_1.png'

import {FormLabel} from 'XfersComponents'
import {toCurrency} from 'UtilityFunctions'

function MBBInstructions({screenType, topUpAmount, xfersBankAccount}) {
  const fromMbb = xfersBankAccount.abbreviation == "MBB" ? true : false;
  return (
    <div>
      {screenType === "desktop" ? <DesktopView topUpAmount={topUpAmount} {...xfersBankAccount} fromMbb={fromMbb} /> : <MobileView topUpAmount={topUpAmount} {...xfersBankAccount} />}
    </div>
  );
}

function DesktopView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount, fromMbb}) {
  return (
    <div>
      {fromMbb ?
        <div>
          <StepContainer
            stepHeader="STEP 1"
            stepSubHeader={<span>Select <strong>Funds Transfer</strong> > <strong>Update Payee Account List</strong> > <strong>Add/Remove Payee Account(s) with Maybank</strong>. Enter these details accurately into the fields</span>}>
            <FieldContainer>
              <Field label="Bank" value={`${bankName} (${abbreviation})`} />
              <Field label="Assign Account Number" value={accountNo} toBeCopied />
              <Field label="Account Holder Name" value={payeeName} />
            </FieldContainer>
          </StepContainer>

          <StepContainer
            stepHeader="STEP 2"
            stepSubHeader={<span>Select <strong>Funds Transfer</strong> > <strong>To an Existing Payee with Maybank</strong>. Enter these details accurately into the fields</span>}>
            <FieldContainer>
              <Field label="Transfer Amount" value={toCurrency(topUpAmount)} />
            </FieldContainer>
          </StepContainer>
        </div>
        :
        <div>
          <StepContainer
            stepHeader="STEP 1"
            stepSubHeader={<span>Select <strong>Funds Transfer</strong> > <strong>Update Payee Account List</strong> > <strong>Add/Remove Payee Account(s) with Other Banks</strong>. Enter these details accurately into the fields</span>}>
            <FieldContainer>
              <Field label="Payee Nickname" value={payeeName} />
              <Field label="Bank" value={`${bankName} (${abbreviation})`} />
              <Field label="Account Number" value={accountNo} toBeCopied />
              <Field label="Account Holder" value={payeeName} />
            </FieldContainer>
          </StepContainer>

          <StepContainer
            stepHeader="STEP 2"
            stepSubHeader={<span>Select <strong>Funds Transfer</strong> > <strong>To an Existing Payee with Another Bank</strong>. Enter these details accurately into the fields</span>}>
            <FieldContainer>
              <Field label="Credit Beneficiary Account" value="Within minutes (via FAST)"/>
              <Field label="Transfer Amount" value={toCurrency(topUpAmount)} />
              <Field label="Transaction Details" value={uniqueId} />
              <Field label="Purpose" value="Other"/>
            </FieldContainer>
          </StepContainer>
        </div>
      }
    </div>
  );
}

function MobileView({accountNo, abbreviation, payeeName, bankName, uniqueId, topUpAmount}) {
  return (
    <div>
      <StepContainer
        stepHeader="STEP 1"
        stepSubHeader="Make a Funds Transfer to Another Bank via FAST">
        <FieldImage image={mbbImage1} />
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Payee Nickname" value={payeeName} />
          <Field label="Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Transfer Amount" value={toCurrency(topUpAmount)} />
          <Field label="Transaction Details" value={uniqueId} />
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 3"
        stepSubHeader="Keep the screenshot of the transfer as this will help us expedite your issue (if any) when you require support assistance.">
      </StepContainer>
    </div>
  );
}

export default MBBInstructions
