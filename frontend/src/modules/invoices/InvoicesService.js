import {
  getInvoicesPendingAction,
  getInvoicesSuccessAction,
  getInvoicesErrorAction,
  getAddInvoiceAction,
  getDeleteInvoiceAction,
  getEditInvoiceAction,
} from "./InvoicesActions";

export function getInvoices(token) {
  return (dispatch) => {
    dispatch(getInvoicesPendingAction());
    const url = process.env.REACT_APP_URL + process.env.REACT_APP_INVOICES;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(url, requestOptions)
      .then((result) => result.json())
      .then((invoicesData) => {
        dispatch(getInvoicesSuccessAction(invoicesData));
      })
      .catch((error) => {
        dispatch(getInvoicesErrorAction(error));
        console.log("Error in invoices " + error);
      });
  };
}

export function getProjectInvoices(projectName, token) {
  return (dispatch) => {
    dispatch(getInvoicesPendingAction());
    const url =
      process.env.REACT_APP_URL +
      process.env.REACT_APP_INVOICES +
      "/invoicesOfProject/" +
      projectName;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(url, requestOptions)
      .then((result) => result.json())
      .then((invoicesData) => {
        dispatch(getInvoicesSuccessAction(invoicesData));
      })
      .catch((error) => {
        dispatch(getInvoicesErrorAction(error));
        console.log("Error in invoices " + error);
      });
  };
}

export function addInvoice(invoice, token) {
  return (dispatch) => {
    const url = process.env.REACT_APP_URL + process.env.REACT_APP_INVOICES;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(invoice),
    };
    return fetch(url, requestOptions)
      .then((result) => result.json())
      .then((invoice) => {
        dispatch(getAddInvoiceAction(invoice));
      })
      .catch((error) => {
        dispatch(getInvoicesErrorAction());
        console.log("Error in adding the Invoice " + error);
      });
  };
}

export function deleteInvoice(invoiceId, token) {
  return (dispatch) => {
    const url =
      process.env.REACT_APP_URL + process.env.REACT_APP_INVOICES + invoiceId;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return fetch(url, requestOptions)
      .then((result) => result.json())
      .then((invoice) => {
        dispatch(getDeleteInvoiceAction(invoice));
      })
      .catch((error) => {
        dispatch(getInvoicesErrorAction());
        console.log("Error in deleting the Invoice " + error);
      });
  };
}

export function editInvoice(invoice, token) {
  const { file, createdAt, ...newInvoice } = invoice;
  return (dispatch) => {
    const url =
      process.env.REACT_APP_URL + process.env.REACT_APP_INVOICES + invoice.id;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newInvoice),
    };
    return fetch(url, requestOptions)
      .then((result) => result.json())
      .then((invoice) => {
        dispatch(getEditInvoiceAction(invoice));
      })
      .catch((error) => {
        dispatch(getInvoicesErrorAction());
        console.log("Error in editing the Invoice " + error);
      });
  };
}
