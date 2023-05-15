export const INVOICES_PENDING = "INVOICES_PENDING";
export const INVOICES_SUCCESS = "INVOICES_SUCCESS";
export const INVOICES_ERROR = "INVOICES_ERROR";
export const ADD_INVOICE = "ADD_INVOICE";
export const DELETE_INVOICE = "DELETE_INVOICE";
export const EDIT_INVOICE = "EDIT_INVOICE";
export const INVOICES_REMOVE = "INVOICES_REMOVE";

export function getInvoicesPendingAction() {
  return {
    type: INVOICES_PENDING,
  };
}

export function getInvoicesSuccessAction(invoices) {
  return {
    type: INVOICES_SUCCESS,
    invoices: invoices,
  };
}

export function getInvoicesErrorAction() {
  return {
    type: INVOICES_ERROR,
  };
}

export function getAddInvoiceAction(invoice) {
  return {
    type: ADD_INVOICE,
    invoice: invoice,
  };
}

export function getDeleteInvoiceAction(invoice) {
  return {
    type: DELETE_INVOICE,
    invoice: invoice,
  };
}

export function getEditInvoiceAction(invoice) {
  return {
    type: EDIT_INVOICE,
    invoice: invoice,
  };
}

export function getInvoicesRemoveAction() {
  return {
    type: INVOICES_REMOVE,
  };
}
