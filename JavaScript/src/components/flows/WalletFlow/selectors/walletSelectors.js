import { createSelector } from 'reselect'

const getUserBanks = (topUp) => topUp.userBanks
const getSelectedBankId = (topUp) => topUp.selectedBankId

export const getSelectedBankDetails = createSelector(
  [getUserBanks, getSelectedBankId],
  (userBanks, selectedBankId) => {
    return userBanks.find(item => item.id === selectedBankId);
  }
);

export const sortUserBanksOnVerification = createSelector(
  [getUserBanks],
  (userBanks) => {
    let verifiedBanks = [], nonVerifiedBanks = [];
    userBanks.forEach(bank => {
      if (bank.verification_status == "verified") {
        verifiedBanks.push(bank);
      } else {
        nonVerifiedBanks.push(bank);
      }
    })
    return { verifiedBanks, nonVerifiedBanks }
  }
);
