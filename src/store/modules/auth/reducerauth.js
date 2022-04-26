import axios from '../../../services/axios';
import * as types from '../types'
const INITIAL_STATE = {
    isLoggedIn: false,
    token: false,
    user: {},
    isLoading: false,
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            {
                console.log('sucesso', {...action.payload})
                const newState = {...state};
                newState.isLoggedIn = true;
                newState.token = action.payload.token;
                newState.user = action.payload.user;
                newState.isLoading = false;
                return newState
            }

        case types.LOGIN_FAILED:
            {
                delete axios.defaults.headers.Authorization;
                const newState = {...INITIAL_STATE }
                return newState;
            }

        case types.LOGIN_REQUEST:
            {
                const newState = { ...state};
                newState.isLoading = true;
                return INITIAL_STATE
            }

        case types.REGISTER_UPDATED_SUCCESS:
          {
              const newState = { ...state};
              newState.user.nome = action.payload.nome;
              newState.user.email = action.payload.email;
              newState.isLoading = true;
              return INITIAL_STATE
          }

        case types.REGISTER_CREATED_SUCCESS:
          {
              const newState = { ...state};
              newState.isLoading = false;
              return INITIAL_STATE
          }

          case types.REGISTER_FAILURE:
        {
            const newState = { ...state};
            newState.isLoading = false;
            return INITIAL_STATE
        }

        case types.REGISTER_REQUEST:
        {
            const newState = { ...state};
            newState.isLoading = true;
            return INITIAL_STATE
        }

        default:
            return state
    }
}
