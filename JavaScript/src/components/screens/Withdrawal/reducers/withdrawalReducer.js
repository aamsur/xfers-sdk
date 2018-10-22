import { } from 'Withdrawal/actions'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------

const withdrawalReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default withdrawalReducer
