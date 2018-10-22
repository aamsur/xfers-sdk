import { } from 'TopUp/actions'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------

const topUpReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default topUpReducer
