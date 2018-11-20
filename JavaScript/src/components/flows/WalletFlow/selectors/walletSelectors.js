import { createSelector } from 'reselect'

const getFilter = (wallet) => wallet.filter
const getBankOptions = (wallet) => wallet.bankOptions
const getUserBanks = (wallet) => wallet.userBanks
const getSelectedBankId = (wallet) => wallet.selectedBankId

const getWithdrawalRequest = (wallet) => wallet.withdrawalRequest
// const getBankId = (withdrawalView) => withdrawalView.withdrawalBankId
// const getWalletId = (withdrawalView) => withdrawalView.withdrawalWalletId
// const getWithdrawalAmount = (withdrawalView) => withdrawalView.withdrawalAmount
// const getRequestBreakdownList = (withdrawalView) => withdrawalView.requestBreakdownList

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

export const getSelectedBankDetails = createSelector(
  [getUserBanks, getSelectedBankId],
  (userBanks, selectedBankId) => {
    return userBanks.find(item => item.id === selectedBankId) || {};
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


// export const checkLimitAndType = createSelector(
//   [ getWalletId,
//     getWithdrawalAmount,
//     getUserWithdrawalStatus,
//   ],
//   (walletId, withdrawalAmount, userWithdrawalStatus) => {
//     if (walletId == 1 && withdrawalAmount > 50000) {
//       return {limit: 50000, limitType: undefined};
//     }
//     else if (walletId == 2) {
//       const {dailyRemaining, monthlyRemaining} = userWithdrawalStatus;
//       if (dailyRemaining < withdrawalAmount) {
//         return {limit: dailyRemaining, limitType: 'daily'}
//       }
//       if (monthlyRemaining < withdrawalAmount) {
//         return {limit: monthlyRemaining, limitType: 'monthly'}
//       }
//     }
//
//     return {limit: undefined, limitType: undefined};
//   }
// );
