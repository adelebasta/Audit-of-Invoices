import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import ItemForm from "./ItemForm";
import { ButtonGroup } from "react-bootstrap";
import * as InvoicesService from "../modules/invoices/InvoicesService";
import Loading from "./Loading";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./Login";
import TopMenu from "./TopMenu";

const mapStateToProps = (state) => {
  return state;
};

const initialState = {
  id: "",
  projectName: "",
  projectDescription: "",
  merchant: "",
  invoiceNr: "",
  issuedOn: "",
  currency: "",
  subtotal: "",
  vatPercent: "",
  vatTotal: "",
  total: "",
  items: [],
  file: "",
  new: false,
  loading: false,
};

class InvoiceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.editInvoice = this.editInvoice.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.cancel = this.cancel.bind(this);
    this.showPDF = this.showPDF.bind(this);
  }
  componentWillUnmount() {
    this.setState(initialState);
  }
  editInvoice(e) {
    e.preventDefault();
    const token = this.props.authenticationReducer.accessToken;
    const updatedInvoice = this.state;
    const { editInvoice } = this.props;
    editInvoice(updatedInvoice, token);
    this.props.history.push(
      "/?projectName=" + this.state.projectName + "&type=Rechnungen"
    );
  }
  createInvoice(e) {
    e.preventDefault();
    const token = this.props.authenticationReducer.accessToken;
    const newInvoice = this.state;
    const { addInvoice } = this.props;
    addInvoice(newInvoice, token);
    this.props.history.push(
      "/?projectName=" + this.state.projectName + "&type=Rechnungen"
    );
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleItem(item) {
    var items = this.state.items;
    for (var i in items) {
      if (items[i]["merchantArticleId"] === item["merchantArticleId"]) {
        items[i] = item;
        break;
      }
    }
    this.setState({ items: items });
  }
  cancel(e) {
    e.preventDefault();
    var url = "/";
    if (this.state.projectName) {
      url = "/?projectName=" + this.state.projectName + "&type=Rechnungen";
    }
    this.props.history.push(url);
  }
  showPDF(e) {
    e.preventDefault();
    const filePath = this.state.file;
    const filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.length
    );
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.authenticationReducer.accessToken,
      },
    };
    var url;
    if (this.state.id) {
      url =
        process.env.REACT_APP_URL +
        process.env.REACT_APP_UPLOAD +
        filename +
        "?projectName=" +
        this.state.projectName +
        "&type=Rechnungen";
    } else {
      url =
        process.env.REACT_APP_URL +
        process.env.REACT_APP_UPLOAD +
        filename +
        "?type=temp";
    }
    fetch(url, requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        var _url = window.URL.createObjectURL(blob);
        window.open(_url, "_blank").focus();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    if (this.props.match.params.invoiceId) {
      const url =
        process.env.REACT_APP_URL +
        process.env.REACT_APP_INVOICES +
        this.props.match.params.invoiceId;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + this.props.authenticationReducer.accessToken,
        },
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(
          (invoiceData) => {
            this.setState({
              id: invoiceData._id,
              projectName: invoiceData.projectName,
              projectDescription: invoiceData.projectDescription,
              merchant: invoiceData.merchant,
              invoiceNr: invoiceData.invoiceNr,
              issuedOn: invoiceData.issuedOn,
              currency: invoiceData.currency,
              subtotal: invoiceData.subtotal,
              vatPercent: invoiceData.vatPercent,
              vatTotal: invoiceData.vatTotal,
              total: invoiceData.total,
              createdAt: invoiceData.createdAt,
              file: invoiceData.file,
              items: invoiceData.items,
              loading: false,
            });
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const projectName = urlParams.get("projectName")
        ? urlParams.get("projectName")
        : "";
      const invoiceData = this.props.location.state.invoiceData.invoice;
      this.setState({
        loading: false,
        projectDescription: invoiceData.projectDescription,
        projectName: projectName,
        merchant: invoiceData.merchant,
        invoiceNr: invoiceData.invoiceNr,
        issuedOn: invoiceData.issuedOn,
        currency: invoiceData.currency,
        subtotal: invoiceData.subtotal,
        vatPercent: invoiceData.vatPercent,
        vatTotal: invoiceData.vatTotal,
        total: invoiceData.total,
        file: invoiceData.file,
        items: invoiceData.items,
        new: true,
      });
    }
  }
  render() {
    const user = this.props.authenticationReducer.user;
    const loggedIn = user ? true : false;
    if (!loggedIn) {
      return (
        <div>
          <TopMenu />
          <Login />
        </div>
      );
    } else {
      const itemsObject = this.state.items.map((item) => {
        return (
          <ItemForm
            handleItemChange={this.handleItem}
            key={item["merchantArticleId"]}
            item={item}
          />
        );
      });
      var submitButton;
      const disabled = this.state.projectName === "";
      if (!this.state.new) {
        submitButton = (
          <div className="button-confirm-div">
            <button
              onClick={this.editInvoice}
              type="submit"
              className="button-confirm"
              disabled={disabled}
            >
              Rechnung bestätigen
            </button>
          </div>
        );
      } else {
        submitButton = (
          <div className="button-confirm-div">
            <button
              onClick={this.createInvoice}
              type="submit"
              className="button-confirm"
              disabled={disabled}
            >
              Rechnung speichern
            </button>
          </div>
        );
      }
      if (this.state.loading) {
        return (
          <div>
            <TopMenu />
            <Loading />
          </div>
        );
      } else {
        return (
          <React.Fragment>
            <TopMenu />
            <div className="container container-edit">
              <button className="btn-danger" onClick={this.showPDF}>
                PDF öffnen
              </button>
              <Form className="edit-invoice-form">
                <Form.Row>
                  <div className="section-datainfo first-section">
                    <Form.Group>
                      <Form.Label className="field__label">
                        Projektname
                      </Form.Label>

                      <Form.Control
                        id="project-name-field"
                        className="field__input project-name"
                        type="text"
                        name="projectName"
                        placeholder="Projektname eingeben"
                        onChange={this.handleChange}
                        value={this.state.projectName}
                      />
                      {disabled && <p className="error-message"></p>}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="field__label">
                        Projektbeschreibung
                      </Form.Label>
                      <Form.Control
                        className="field__input__long"
                        type="text"
                        name="projectDescription"
                        onChange={this.handleChange}
                        value={this.state.projectDescription}
                      />
                    </Form.Group>
                  </div>

                  <div className="section-datainfo second-section">
                    <Form.Group>
                      <Form.Label className="field__label">
                        Rechnungssteller
                      </Form.Label>
                      <Form.Control
                        className="field__input"
                        type="text"
                        name="merchant"
                        onChange={this.handleChange}
                        value={this.state.merchant}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="field__label">
                        Rechnungsnummer
                      </Form.Label>
                      <Form.Control
                        className="field__input"
                        type="text"
                        name="invoiceNr"
                        onChange={this.handleChange}
                        value={this.state.invoiceNr}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="field__label">
                        Rechnungsdatum
                      </Form.Label>
                      <Form.Control
                        className="field__input"
                        type="text"
                        name="issuedOn"
                        onChange={this.handleChange}
                        value={this.state.issuedOn}
                      />
                    </Form.Group>

                    {this.props.match.params.invoiceId && (
                      <Form.Group>
                        <Form.Label className="field__label">
                          Einlesedatum
                        </Form.Label>
                        <Form.Control
                          className="field__input"
                          type="text"
                          name="createdAt"
                          onChange={this.handleChange}
                          value={this.state.createdAt}
                        />
                      </Form.Group>
                    )}
                  </div>
                  <br />

                  {itemsObject}

                  <ButtonGroup className="conCanButtonGroup">
                    {submitButton}
                    <div className="button-cancel-div">
                      <button
                        className="button-cancel"
                        type="cancel"
                        onClick={this.cancel}
                      >
                        Einlesen abbrechen
                      </button>
                    </div>
                  </ButtonGroup>
                </Form.Row>
              </Form>
            </div>
          </React.Fragment>
        );
      }
    }
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      editInvoice: InvoicesService.editInvoice,
      addInvoice: InvoicesService.addInvoice,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InvoiceEdit));
