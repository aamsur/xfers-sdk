import { } from 'Verification/actions'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------

const personalVerificationReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default personalVerificationReducer
