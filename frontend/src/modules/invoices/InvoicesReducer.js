import * as InvoicesActions from "./InvoicesActions";

const initialState = {
  invoices: [],
  invoicesPending: false,
  error: null,
  items: [],
};

function InvoicesReducer(state = initialState, action) {
  switch (action.type) {
    case InvoicesActions.INVOICES_PENDING:
      return {
        ...state,
        invoicesPending: true,
      };
    case InvoicesActions.INVOICES_SUCCESS:
      return {
        ...state,
        invoicesPending: false,
        invoices: action.invoices,
        error: null,
      };
    case InvoicesActions.ADD_INVOICE:
      return Object.assign({}, state, {
        invoices: state.invoices.concat(action.invoice),
      });
    case InvoicesActions.DELETE_INVOICE:
      return Object.assign({}, state, {
        invoices: state.invoices.filter((invoice) => {
          return invoice._id !== action.invoice._id;
        }),
      });
    case InvoicesActions.EDIT_INVOICE:
      return Object.assign({}, state, {
        invoices: state.invoices.map((invoice) => {
          if (invoice._id === action.invoice._id) {
            return (invoice = action.invoice);
          } else {
            return invoice;
          }
        }),
      });
    case InvoicesActions.INVOICES_ERROR:
      return {
        ...state,
        invoicesPending: false,
        error: "Failed to load Invoices",
      };
    case InvoicesActions.INVOICES_REMOVE:
      return {
        ...state,
        invoicesPending: false,
        invoices: [],
        items: [],
        error: null,
      };
    default:
      return state;
  }
}

export default InvoicesReducer;
