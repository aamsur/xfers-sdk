import {
  NAVIGATE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SEND_HTTP_REQUEST,
  INITIALIZATION_SUCCESS,
} from 'TopUp/actions/constants'


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [NAVIGATE]: (state, {route}) => ({ ...state, route }),
  [OPEN_MODAL]: (state, action) => ({ ...state, showModal: true }),
  [CLOSE_MODAL]: (state, action) => ({ ...state, showModal: false }),
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
  // [INITIALIZATION_SUCCESS]: (state, {res}) => {
  //   const { bankOptions, userBanks } = res;
  //   return { ...state, bankOptions, userBanks, dataLoading: false }
  // },
}

// ------------------------------------
// Reducer
// ------------------------------------

const topUpReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default topUpReducer
