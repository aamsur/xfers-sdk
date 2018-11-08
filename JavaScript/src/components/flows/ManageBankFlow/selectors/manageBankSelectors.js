import { createSelector } from 'reselect'

const getFilter = (manageBank) => manageBank.filter
const getBankOptions = (manageBank) => manageBank.bankOptions
const getUserBanks = (manageBank) => manageBank.userBanks
const getSelectedBankId = (manageBank) => manageBank.selectedBankId

export const getFilteredBankOptions = createSelector(
  [getFilter, getBankOptions],
  (filter, bankOptions) => {
    return bankOptions.filter((option) => {
      const lowerFilter = filter.toLowerCase();
      if (
        option.name.toLowerCase().includes(lowerFilter) ||
        option.abbreviation.toLowerCase().includes(lowerFilter)
      ) { return true }
      return false;
    });
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

export const getSelectedBankDetails = createSelector(
  [getUserBanks, getSelectedBankId],
  (userBanks, selectedBankId) => {
    return userBanks.find(item => item.id === selectedBankId) || {};
  }
);
