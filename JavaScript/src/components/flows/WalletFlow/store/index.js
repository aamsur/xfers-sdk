import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default (props = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middleware = [thunk];
  const enhancers = [];

  if (process.env.NODE_ENV == 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  /* Acceptable params:
   * { amount, flowType, userBanks, availableBalance }
   */
  const initialState = {
    walletStore: {
      // External Props
      params: {},
      ...props,

      // flowType >> ['bank', 'withdrawal', 'topup', 'payment']
      flowType: (props.params && props.params.flowType) || '',
      bankRoute: 'index', // bankRoute >> ['index', 'new', 'delete']
      withdrawalRoute: 'index', // withdrawalRoute >> ['index']
      topupRoute: 'index', // topupRoute >> ['index']
      paymentRoute: 'index', // paymentRoute >> ['index']

      error: '',
      initialized: false,
      dataLoading: false,

      // User Information
      walletId: '5',
      availableBalance: '',
      gauthEnabled: false,
      bitcoinUser: false,
      vipBetaUser: false,
      acceptedTnc: false,
      kycVerified: false,
      accountLocked: false,
      multiBankAccountLocked: false,
      userBanks: [],

      // MANAGE BANK STORE
      bankOptions: [],
      filter: '',
      selectedBankId: '',
      newBankAccountDetails: {
        bank: '',
        accountNo: '',
        accountHolderName: '',
        bankStatementFile: undefined,
      },

      // WITHDRAWAL STORE
      userWithdrawalStatus: {
        dailyProgressBar: 0,
        monthlyProgressBar: 0,
        dailyRemaining: 10000,
        monthlyRemaining: 40000
      },
      newWithdrawalRequest: {
        withdrawalAmount: '',
        withdrawalBankId: '',
        withdrawalProcessingType: '',
        requestBreakdownList: [],
        finalWithdrawalAmount: '',
      },

      // TOP-UP STORE
      userTopUpStatus: {
        dailyLimit: '',
        remaining: '',
        resetTiming: '',
      },
      newTopUpRequest: {
        bankId: '',
        topUpAmount: (props.params && props.params.amount) || ''
      },
      xfersBankAccount: {
        accountNo: '123456789',
        abbreviation: 'DBS',
        bankName: 'CIMB Bank',
        uniqueId: '94463205',
        payeeName: 'XV PTED LTD'
      },
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  return store;
}
