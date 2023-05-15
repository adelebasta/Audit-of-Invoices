import React, { Component } from "react";
import { connect } from "react-redux";
import TopMenu from "./TopMenu";
import ItemsList from "./ItemsList";
import Loading from "./Loading";
import Login from "./Login";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class Search extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      loading: false,
      searchedInfo: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchedInfo = urlParams.get("i");
    this.setState({
      loading: true,
    });
    fetch(
      process.env.REACT_APP_URL +
        process.env.REACT_APP_INVOICES +
        "search?searchInvoice=" +
        searchedInfo,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.authentication.accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          invoices: data,
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const user = this.props.authentication.user;
    const loggedIn = user ? true : false;
    if (loggedIn) {
      if (this.state.invoices.length === 0 && !this.state.loading) {
        return (
          <div>
            <TopMenu />
            <React.Fragment>
              <div className="container container-edit" id="center-form">
                <div className="info-section">
                  <p className="no-searchResult">
                    Es wurden keine Suchergebnisse gefunden. <br /> Bitte
                    überprüfen Sie ihre Sucheingabe.
                  </p>
                </div>
              </div>
            </React.Fragment>
          </div>
        );
      } else {
        return (
          <div>
            <TopMenu />
            <React.Fragment>
              <div
                className="container container-edit div-searchResult"
                id="center-form"
              >
                <div className="info-section">
                  <p className="searchResult">
                    Es wurden folgende Suchergebnisse gefunden:{" "}
                  </p>
                </div>
              </div>
            </React.Fragment>
            {!this.state.loading && (
              <ItemsList
                showDeleteButton="hide"
                invoices={this.state.invoices}
              />
            )}
            {this.state.loading && <Loading />}
          </div>
        );
      }
    } else {
      return (
        <div>
          <TopMenu />
          <Login />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, null)(Search);
