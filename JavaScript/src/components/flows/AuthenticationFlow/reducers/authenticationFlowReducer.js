import {
  SEND_HTTP_REQUEST,
} from 'AuthenticationFlow/actions/constants'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEND_HTTP_REQUEST]: (state, action) => ({ ...state, dataLoading: true }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const authenticationFlowReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default authenticationFlowReducer
