import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as InvoicesService from "../modules/invoices/InvoicesService";
import invoice from "../layout/images/doc.png";
import close from "../layout/images/delete.png";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.invoice._id,
      error: null,
      popUp: false,
    };
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
  }
  deleteInvoice() {
    const token = this.props.authentication.accessToken;
    const { deleteInvoice } = this.props;
    deleteInvoice(this.state.id, token);
  }
  showPopUp() {
    this.setState({
      popUp: true,
    });
  }
  hidePopUp() {
    this.setState({
      popUp: false,
    });
  }
  render() {
    const showDeleteButton =
      this.props.showDeleteButton === "hide" ? false : true;
    return (
      <div className="div-project">
        <PopUp
          display={this.state.popUp}
          deleteItem={this.deleteInvoice}
          hidePopUp={this.hidePopUp}
        />
        {showDeleteButton && (
          <button id="div-project-inner" onClick={this.showPopUp}>
            <img className="delete-icon" src={close} alt="close" />
          </button>
        )}
        <button id="div-project-inner1">
          <Link
            style={{ textDecoration: "none" }}
            to={`/invoices/edit/${this.props.invoice._id}`}
          >
            <img className="doc-icon" src={invoice} alt="invoice" />
          </Link>
          <li id="edit-li" className="docName">
            {this.props.name}
          </li>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteInvoice: InvoicesService.deleteInvoice,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
