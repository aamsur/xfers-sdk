import { createSelector } from 'reselect'

const getFilter = (manageBank) => manageBank.filter
const getBankOptions = (manageBank) => manageBank.bankOptions

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
