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
   * { goBackPreviousModule, addBankAccount }
   */
  const initialState = {
    authenticationFlow: {

      // External Props
      params: {},
      ...props,
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
