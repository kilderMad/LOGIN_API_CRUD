import * as types from '../types'
const INITIAL_STATE = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const newState = {...state};
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;

      return state

      case types.LOGIN_FAILED:
        return INITIAL_STATE

    default:
      return state
  }
}
