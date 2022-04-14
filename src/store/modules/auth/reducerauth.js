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

                return newState
            }

        case types.LOGIN_FAILED:
            {
                const newState = {...INITIAL_STATE }
                return newState;
            }

        case types.LOGIN_REQUEST:
            {
                console.log('REDUCER', {...INITIAL_STATE });
                return INITIAL_STATE
            }

        default:
            return state
    }
}
