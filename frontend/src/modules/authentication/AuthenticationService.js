import * as authenticationActions from "./AuthenticationActions";
import { getInvoicesRemoveAction } from "../invoices/InvoicesActions";

export function authenticateUser(password) {
  return (dispatch) => {
    dispatch(authenticationActions.getAuthenticationPendingAction());
    login(password)
      .then(
        (userSession) => {
          dispatch(
            authenticationActions.getAuthenticationSuccessAction(userSession)
          );
        },
        (error) => {
          dispatch(authenticationActions.getAuthenticationErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(authenticationActions.getAuthenticationErrorAction(error));
      });
  };
}

function login(password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  };
  return fetch(
    process.env.REACT_APP_URL + process.env.REACT_APP_LOGIN,
    requestOptions
  )
    .then(handleResponse)
    .then((userSession) => {
      console.log(process.env.REACT_APP_URL);
      return userSession;
    });
}

function changePasswordFetch(newPassword, token) {
  const url = process.env.REACT_APP_URL + process.env.REACT_APP_USERS;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ password: newPassword }),
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

export function changePassword(newPassword, token) {
  return (dispatch) => {
    dispatch(authenticationActions.getAuthenticationPendingAction());
    changePasswordFetch(newPassword, token)
      .then(
        (userSession) => {
          dispatch(
            authenticationActions.getAuthenticationSuccessAction(userSession)
          );
        },
        (error) => {
          dispatch(authenticationActions.getChangePasswordErrorAction(error));
          console.log("Error in auth " + error);
        }
      )
      .catch((error) => {
        dispatch(authenticationActions.getChangePasswordErrorAction(error));
        console.log("Error in auth " + error);
      });
  };
}

function handleResponse(res) {
  const authorizationHeader = res.headers.get("Authorization");
  return res.text().then((text) => {
    //user data sent from backend when the user is authenticated
    const data = text && JSON.parse(text);
    var token;
    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }
    if (!res.ok) {
      if (res.status === 401) {
        logout();
      }
      const error = (data && data.message) || res.statusText;
      return Promise.reject(error);
    } else {
      let userSession = {
        user: data,
        accessToken: token,
      };
      return userSession;
    }
  });
}

export function logout() {
  return (dispatch) => {
    dispatch(authenticationActions.getLogoutAction());
    dispatch(getInvoicesRemoveAction());
  };
}

export function getAuthenticationPendingAction() {
  return (dispatch) => {
    dispatch(authenticationActions.getAuthenticationPendingAction());
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return (dispatch) => {
    dispatch(authenticationActions.getAuthenticationSuccessAction(userSession));
  };
}

export function getAuthenticationErrorAction(error) {
  return (dispatch) => {
    dispatch(authenticationActions.getAuthenticationErrorAction(error));
  };
}
