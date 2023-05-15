import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class Footer extends Component {
  render() {
    const show = !this.props.authentication.user ? "block" : "None";
    return (
      <footer style={{ display: show }}>
        <Link className="link_footer" to="/">
          Home
        </Link>
        <Link className="link_footer" to="/about">
          About us
        </Link>
        <Link className="link_footer" to="/impressum">
          Impressum
        </Link>
      </footer>
    );
  }
}

export default connect(mapStateToProps, null)(Footer);
