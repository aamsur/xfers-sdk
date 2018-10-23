import React from 'react'
import {connect} from 'react-redux'
import classes from './Instructions.scss'

import {
  Panel,
  Button,
  NewModal,
  View,
  AnchorLink,
  FooterButtonGroup
} from 'XfersComponents'

import {toCurrency} from 'UtilityFunctions'
import {
  DBSInstructions,
  UOBInstructions,
  OCBCInstructions,
  SCBInstructions,
  HSBCInstructions,
  CITIInstructions,
  CIMBInstructions,
  BOCInstructions,
  MBBInstructions
} from './components'

import {switchActiveStep, selectScreenType, submitBankTopUpRequest, openModal, closeModal} from 'TopUp/actions/topUpActions'
import getBankSpecifics from './bank_specific_instructions'

function mapStateToProps({topUp}, props) {
  const {xfersBankAccount, userBanks, requestIndex, bankId, screenType, topUpRequestList} = topUp;

  let selectedBankId = topUpRequestList[requestIndex].user_bank_account_id;
  let senderBankAccount;
  for (let i = 0; i < userBanks.length; i++) {
    if (userBanks[i].id == selectedBankId) {
      senderBankAccount = userVerifiedBankList[i];
      break;
    }
  }
  const selectedBank = senderBankAccount.bank_abbreviation.toUpperCase();
  const bankTopUpAmount = topUpRequestList[requestIndex] ? topUpRequestList[requestIndex].amount : 0;

  return {
    bankId,
    screenType,
    selectedBank,
    xfersBankAccount,
    topUpAmount: bankTopUpAmount,
    ...props
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: (modalType) => {
      dispatch(closeModal(modalType));
    },
    switchActiveStep: (page) => {
      dispatch(switchActiveStep(page));
    },
    selectScreenType: (screenType) => {
      dispatch(selectScreenType(screenType));
    },
    submitRequest: () => {
      dispatch(openModal('requestConfirmation'));
    },
    confirmRequest: (topUpAmount, bankId) => {
      dispatch(closeModal('requestConfirmation'))
      dispatch(submitBankTopUpRequest(topUpAmount, bankId));
    },
  }
}

function Instructions({
  bankId,
  screenType,
  selectedBank,
  topUpAmount,
  switchActiveStep,
  selectScreenType,
  submitRequest,
  confirmRequest,
  closeModal,
  showConfirmationModal,
  xfersBankAccount
}) {
  const {externalBankUrl, bankCommentLabel, bankAcronyms} = getBankSpecifics(selectedBank);
  return (
    <Panel>
      <View paddingTop paddingBtm>
        <div id="anchorTop" className={classes.headerNavbar}>
          <AnchorLink className={classes.leftNav} onClick={() => switchActiveStep("init")}>Back</AnchorLink>
          <AnchorLink className={classes.rightNav} onClick={() => switchActiveStep("status")}>I have transferred</AnchorLink>
        </div>

        <div className={classes.header}>
          <p><strong>Please refer to these instructions while making a bank transfer</strong></p>
          {screenType === "mobile" ?
            <AnchorLink onClick={() => selectScreenType("desktop")}>Transferring using desktop?</AnchorLink> :
            <AnchorLink onClick={() => selectScreenType("mobile")}>Transferring using mobile?</AnchorLink>
          }
        </div>

        <hr/>

        {selectedBank === "POSB" && <DBSInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "DBS" && <DBSInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "UOB" && <UOBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "OCBC" && <OCBCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "SCB" && <SCBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "HSBC" && <HSBCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "CITI" && <CITIInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "CIMB" && <CIMBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "BOC" && <BOCInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        {selectedBank === "MBB" && <MBBInstructions screenType={screenType} topUpAmount={topUpAmount} xfersBankAccount={xfersBankAccount} />}
        <div>
          <strong>
            <span>NOTE: </span>
          </strong>
          An admin fee of 1% will be charged on your total amount transferred should you fail to comply with our
          <AnchorLink href="https://xfers.groovehq.com/knowledge_base/topics/when-will-you-incur-admin-fees" target> additional terms and conditions</AnchorLink>.
        </div>
      </View>

      <FooterButtonGroup>
        <Button type="primary" href={externalBankUrl} target="noopener" rel="noreferrer nofollow">
          Open {bankAcronyms} Internet Banking
        </Button>
      </FooterButtonGroup>
    </Panel>
  );
}

const ConnectedInstructions = connect(mapStateToProps, mapDispatchToProps)(Instructions);

export default ConnectedInstructions
