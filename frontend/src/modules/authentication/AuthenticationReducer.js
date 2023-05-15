import * as authenticationActions from "./AuthenticationActions";

const initialState = {
  pending: false,
  user: null,
  error: null,
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case authenticationActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
        accessToken: action.accessToken,
        error: null,
      };

      case authenticationActions.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case authenticationActions.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case authenticationActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        user: action.user,
        accessToken: action.accessToken,
      };
    case authenticationActions.AUTHENTICATION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
      

    case authenticationActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authenticationReducer;
