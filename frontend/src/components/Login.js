import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthenticationService from "../modules/authentication/AuthenticationService";
import Form from "react-bootstrap/Form";
// import Spinner from "react-bootstrap/Spinner";
import logo from "../layout/images/logo.jpg";
import Footer from "./Footer";
import ContactSupport from "./ContactSupport";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      popUp: false,
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
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
  login(event) {
    event.preventDefault();
    const { authenticateUser } = this.props;
    const password = this.state.password;
    authenticateUser(password);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  render() {
    var errorMessage;
    if (this.props.authentication.error === "TypeError: Failed to fetch") {
      errorMessage = "Verbindung fehlgeschlagen.";
    } else {
      errorMessage = "Falsches Passwort. Bitte versuchen Sie es erneut.";
    }
    return (
      <div className="body-login">
        <ContactSupport display={this.state.popUp} hidePopUp={this.hidePopUp} />
        <div className="modal-dialog">
          <div className="modal-content modal-edit">
            <form>
              <div className="form-group-log">
                <div className="logo-image">
                  <img className="logo-image" src={logo} alt="logo" />
                </div>
                <div className="form-input">
                  <div className="form-group-log form-login-input">
                    <input
                      type="password"
                      name="password"
                      className="form-control has-error"
                      placeholder="Bitte geben Sie das Passwort ein"
                      onChange={this.handleChange}
                    />
                    {this.props.authentication.error && (
                      <Form.Label className="invalid-password">
                        {errorMessage}
                      </Form.Label>
                    )}
                    <button
                      className="btn btn-block"
                      type="submit"
                      onClick={this.login}
                    >
                      Fortfahren
                    </button>

                    <Form.Label
                      className="contact-support"
                      onClick={this.showPopUp}
                    >
                      Passwort vergessen?
                    </Form.Label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      authenticateUser: AuthenticationService.authenticateUser,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Login);
