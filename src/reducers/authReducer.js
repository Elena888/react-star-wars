import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGNOUT_SUCCESS,
} from '../actions/types'

const initState = {
    authError: null,
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case SIGN_IN_FAILURE:
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed'
        }
      case SIGN_IN_SUCCESS:
        console.log('login success');
        return {
          ...state,
          authError: null
        }
      case SIGNOUT_SUCCESS:
        console.log('signout success');
        return {
            ...state,
          }
      default:
        return state
    }
  };
  
  export default authReducer;