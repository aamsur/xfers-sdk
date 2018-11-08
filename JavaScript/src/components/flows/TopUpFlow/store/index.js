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
    topUpFlow: {

      // External Props
      params: {},
      ...props,

      // Available routes: index, topUpForm
      route: '',
      error: '',
      dataLoading: false,
      availableBalance: '',
      userBanks: [],
      selectedBankId: '',
      newTopUpRequest: {
        bank: '',
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
