import { createSelector } from 'reselect'

const getUserBanks = (topUp) => topUp.userBanks
const getSelectedBankId = (topUp) => topUp.selectedBankId

export const getSelectedBankDetails = createSelector(
  [getUserBanks, getSelectedBankId],
  (userBanks, selectedBankId) => {
    return userBanks.find(item => item.id === selectedBankId);
  }
);
