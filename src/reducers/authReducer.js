import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS
} from '../actions/types'

const initState = {
    authError: null,
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case SIGN_IN_FAILURE:
        return {
          ...state,
          authError: 'Login failed'
        }
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          authError: null
        }
      case SIGNOUT_SUCCESS:
        return {
            ...state,
          }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null
            }

        case SIGNUP_FAILURE:
            return {
                ...state,
                authError: action.err.message
            }
      default:
        return state
    }
  };
  
  export default authReducer;