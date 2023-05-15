import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthenticationService from "../modules/authentication/AuthenticationService";

const mapStateToProps = (state) => {
  return {
    authentication: state.authenticationReducer,
  };
};

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      controlPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  changePassword(event) {
    event.preventDefault();
    const { changePassword } = this.props;
    const password = this.state.password;
    const token = this.props.authentication.accessToken;
    changePassword(password, token);
  }
  render() {
    const disabled =
      this.state.password === "" ||
      this.state.password !== this.state.controlPassword ||
      this.state.password.length < 8;

    var errorMessage;

    if (
      this.props.authentication.error ===
      "SyntaxError: Unexpected token P in JSON at position 0"
    ) {
      errorMessage =
        "Das bisherige und das neues Passwort dürfen nicht übereinstimmen.";
    }

    return (
      <React.Fragment>
        <div className="container container-edit" id="center-form">
          <div className="info-section">
            <h2 className="info-text info-text-hd">
              Willkommen bei FakturaAutomata!
            </h2>

            <p className="info-text ">
              Um fortzufahren, legen Sie bitte ein selbstgewähltes Passwort mit
              mindestens 8 Zeichen an:
            </p>

            <div className="pw-form-section">
              <Form>
                <div>
                  <Form.Group>
                    <Form.Label className="field__label">Passwort:</Form.Label>

                    <Form.Control
                      className="field__input__long "
                      type="password"
                      name="password"
                      placeholder="neues Passwort eingeben"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="field__label">
                      Bestätigung:
                    </Form.Label>
                    <Form.Control
                      className="field__input__long"
                      type="password"
                      name="controlPassword"
                      placeholder="neues Passwort wiederholen"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="fg-error-similar-password">
                    <Form.Label className="error-similar-password">
                      {errorMessage}
                    </Form.Label>
                  </Form.Group>
                </div>
              </Form>
            </div>

            <div className="div-btn-confirm-pw">
              <button
                onClick={this.changePassword}
                type="submit"
                className="button-confirm btn-confirm-pw"
                disabled={disabled}
              >
                Passwort speichern
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword: AuthenticationService.changePassword,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
