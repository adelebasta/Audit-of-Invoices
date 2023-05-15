import React, { Component } from "react";
import FormData from "form-data";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import plus from "../layout/images/plus.png";
import { connect } from "react-redux";
import Loading from "./Loading";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      filePath: "",
      error: "",
      invoiceId: "",
      redirect: false,
      invoiceData: {},
      projectName: "",
      loading: false,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }
  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectName = urlParams.get("projectName");
    if (projectName) {
      this.setState({
        projectName: projectName,
      });
    }
  }
  handleFileChange(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    if (event.target.files[0]) {
      const data = new FormData();
      data.append("file", event.target.files[0]);
      fetch(process.env.REACT_APP_URL + process.env.REACT_APP_UPLOAD, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.props.authentication.accessToken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            redirect: true,
            invoiceData: data,
            loading: false,
          });
        });
    } else {
      this.setState({
        error: "Add invoice",
      });
    }
  }
  renderRedirect() {
    if (this.state.redirect) {
      var search = "";
      if (this.props.projectName !== "none") {
        search = "?projectName=" + this.state.projectName;
      }
      return (
        <Redirect
          push
          to={{
            pathname: "/invoices/create",
            search: search,
            state: { invoiceData: this.state.invoiceData },
          }}
        />
      );
    }
  }

  render() {
    if (this.state.invoiceId === "") {
      return (
        <Form className="upload-invoice-form ">
          <div className="container">
            <div id="formGroup" className="div-btn-description">
              <Form.Group>
                <Form.Label className="pointer-edit" htmlFor="file">
                  <div className="div-add-button">
                    <img className="plus-icon" src={plus} alt="add" />
                    <p className="button-text-add">Rechnung hinzufügen</p>
                  </div>
                </Form.Label>

                <Form.Control
                  id="file"
                  //style deleted and edit in #file in main.css
                  className="form_control_add"
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={this.handleFileChange}
                />
              </Form.Group>
              {this.renderRedirect()}
            </div>
          </div>
          {this.state.loading && <Loading />}
        </Form>
      );
    } else return <Redirect to={`/invoices/edit/${this.state.invoiceId}`} />;
  }
}

export default connect(mapStateToProps, null)(AddButton);
