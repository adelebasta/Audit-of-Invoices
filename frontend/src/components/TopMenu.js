import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthenticationService from "../modules/authentication/AuthenticationService";

import search from "../layout/images/loupe.png";
import branding from "../layout/images/branding.png";
import close from "../layout/images/close.png";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleEnterKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        redirect: true,
      });
    }
  }
  logout(event) {
    event.preventDefault();
    const { logout } = this.props;
    logout();
    window.history.replaceState({}, document.title, "/");
    window.location.reload();
  }
  renderRedirect() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/search",
            search: "?i=" + this.state.search,
          }}
        />
      );
    }
  }
  render() {
    var loggedIn;
    if (
      this.props.authentication.user &&
      !this.props.authentication.user.isFirstPassword
    ) {
      loggedIn = "block";
    } else {
      loggedIn = "None";
    }
    return (
      <nav className="navbar navbar-edit navbar-light">
        <div className="nav-div">
          <Link to="/">
            <button className="navbar-brand">FakturaAutomata</button>
            <img
              id="branding"
              className="branding-icon"
              src={branding}
              alt="FakturaAutomataBranding"
            />
          </Link>
          <div style={{ display: loggedIn }}>
            <div className="div-search">
              <Link to={"/search?i=" + this.state.search}>
                <button className="button-search">
                  <img className="search-icon" src={search} alt="search" />
                </button>
              </Link>

              {this.renderRedirect()}
              <form className="form-edit">
                <input
                  className="input-edit"
                  type="text"
                  placeholder="Rechnungen durchsuchen"
                  name="search"
                  onChange={this.handleChange}
                  value={this.state.search}
                  onKeyDown={this.handleEnterKey}
                />
              </form>
            </div>

            <div className="div-close">
              <Link to="/login" onClick={this.logout}>
                <img id="close-icon-smallScreen" className="close-icon-only" src={close} alt="logout"/>
                <button className="logout">
                  Anwendung schließen
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout: AuthenticationService.logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
