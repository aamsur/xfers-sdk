

function mapStateToProps({topUp}, props) {
  const { xfersBankAccount, userBanks, newTopUpRequest: { bank, topUpAmount }, screenType } = topUp;


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
    selectedBank,
    topUpAmount: bankTopUpAmount,
  }
}

<Panel>
  <FooterButtonGroup>
    <Button type="primary" href={externalBankUrl} target="noopener" rel="noreferrer nofollow">
      Open {bankAcronyms} Internet Banking
    </Button>
  </FooterButtonGroup>
</Panel>
