import {
  NAVIGATE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
  UPDATE_TOP_UP_DETAILS,
} from 'Payment/actions/constants'


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [NAVIGATE]: (state, {route}) => ({ ...state, route }),
  [OPEN_MODAL]: (state, action) => ({ ...state, showModal: true }),
  [CLOSE_MODAL]: (state, action) => ({ ...state, showModal: false }),
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  // [INITIALIZATION_SUCCESS]: (state, {res}) => {
  //   const { userBanks } = res;
  //   return { ...state,  userBanks, dataLoading: false }
  // },
}

// ------------------------------------
// Reducer
// ------------------------------------

const paymentReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default paymentReducer
