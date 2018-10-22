import React from 'react'

import {StepContainer, FieldContainer, Field, FieldImage} from './BankField'

import {FormLabel} from 'XfersComponents'
import {toCurrency} from 'UtilityFunctions'

function CIMBInstructions({screenType, topUpAmount, xfersBankAccount}) {
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
        stepSubHeader={<span>Select <strong>Local Transfer</strong> > <strong>To Other Bank</strong> > <strong>Add Favourite</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Beneficiary Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Beneficiary Account Number" value={accountNo} toBeCopied />
          <Field label="Beneficiary Name" value={payeeName} />
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Message to Recipient" value={uniqueId} />
          <Field label="Purpose Code" value="Business Expenses"/>
        </FieldContainer>
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2 (For subsequent transfers)"
        stepSubHeader={<span>Select <strong>Local Transfer</strong> > <strong>To Other Bank</strong> > <strong>Via FAST</strong>. Enter these details accurately into the fields</span>}>
        <FieldContainer>
          <Field label="Transfer Mode" value="FAST" />
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Message to Recipient" value={uniqueId} />
          <Field label="Purpose Code" value="Business Expenses"/>
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
        stepSubHeader="Transfer via FAST to Other Bank">
      </StepContainer>

      <StepContainer
        stepHeader="STEP 2"
        stepSubHeader="Enter these details accurately into the fields">
        <FieldContainer>
          <Field label="Beneficiary Bank" value={`${bankName} (${abbreviation})`} />
          <Field label="Account Number" value={accountNo} toBeCopied />
          <Field label="Beneficiary Name" value={payeeName} />
          <Field label="Amount" value={toCurrency(topUpAmount)} />
          <Field label="Message to Recipient" value={uniqueId} />
        </FieldContainer>
      </StepContainer>
    </div>
  );
}

export default CIMBInstructions
