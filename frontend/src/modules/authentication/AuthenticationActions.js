export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";
export const LOGOUT = "LOGOUT";
export const REMOVE_REDIRECT = "REMOVE_REDIRECT";

export function getAuthenticationPendingAction() {
  return {
    type: AUTHENTICATION_PENDING,
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return {
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function getAuthenticationErrorAction(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: String(error),
  };
}

export function getChangePasswordAction(userSession) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function getChangePasswordErrorAction(error) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    error: String(error),
  };
}

export function getLogoutAction() {
  return {
    type: LOGOUT,
  };
}
