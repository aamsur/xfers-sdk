import { } from 'ManageBank/actions'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------

const manageBankReducer = (state = {}, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default manageBankReducer
