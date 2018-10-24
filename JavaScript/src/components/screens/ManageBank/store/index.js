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

  const { closeModal, networkClient } = props;

  const initialState = {
    manageBank: {

      // External Props
      closeModal,
      networkClient,
      
      // Available routes: index, new
      route: 'index',
      error: '',
      dataLoading: false,
      userBanks: [],
      bankOptions: [],
      filter: '',
      newBankAccountDetails: {
        bank: '',
        accountNo: '',
        accountHolderName: '',
        bankStatementFile: undefined,
      }
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
