import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as InvoicesService from "../modules/invoices/InvoicesService";
import Invoice from "./Invoice";
import ExcelReport from "./ExcelReport";

const mapStateToProps = (state) => {
  return state;
};

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      loading: false,
      excel: [],
      type: "",
      projectName: "",
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }
  rerenderParentCallback() {
    this.componentDidMount();
  }
  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get("type");
    const projectName = urlParams.get("projectName");
    this.setState({
      type: type,
      projectName: projectName,
    });
    if (this.props.invoices) {
      this.setState({
        invoices: this.props.invoices,
      });
    } else {
      if (type === "Rechnungen") {
        const token = this.props.authenticationReducer.accessToken;
        const { getProjectInvoices } = this.props;
        getProjectInvoices(projectName, token);
      } else if (type === "Excel") {
        const url =
          process.env.REACT_APP_URL +
          process.env.REACT_APP_EXCEL +
          "files/" +
          projectName;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + this.props.authenticationReducer.accessToken,
          },
        };
        fetch(url, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              excel: data,
            });
          });
      }
    }
  }
  render() {
    var items;
    if (this.state.type === "Rechnungen") {
      var invoicesData = this.state.invoices;
      if (invoicesData.length === 0) {
        invoicesData = this.props.invoicesReducer.invoices;
      }
      items = invoicesData.map((invoice) => {
        return (
          <Invoice
            key={invoice._id}
            name={invoice.invoiceNr}
            invoice={invoice}
            showDeleteButton={this.props.showDeleteButton}
          />
        );
      });
    } else if (this.state.type === "Excel") {
      var excelData = this.state.excel;
      items = excelData.map((excelName) => {
        return (
          <ExcelReport
            key={excelName}
            name={excelName}
            projectName={this.state.projectName}
            rerenderParentCallback={this.rerenderParentCallback}
          />
        );
      });
    } else {
      items = this.state.invoices.map((invoice) => {
        return (
          <Invoice
            key={invoice._id}
            name={invoice.invoiceNr}
            invoice={invoice}
            showDeleteButton={this.props.showDeleteButton}
          />
        );
      });
    }

    return (
      <nav>
        <ul className="folder">{items}</ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProjectInvoices: InvoicesService.getProjectInvoices,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
