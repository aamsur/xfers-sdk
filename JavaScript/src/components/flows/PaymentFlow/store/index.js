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

  const {
    params,
    closeModal,
    networkClient
  } = props;

  const initialState = {
    paymentFlow: {

      // External props
      params,
      closeModal,
      networkClient,

      // Available routes: index, payment
      route: '',
      error: '',
      dataLoading: false,

      availableBalance: '',
      gauthEnabled: false,
      bitcoinUser: false,
      vipBetaUser: false,
      acceptedTnc: false,
      kycVerified: false,
      accountLocked: false,
      multiBankAccountLocked: false,
      userBanks: [],
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
