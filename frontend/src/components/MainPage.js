import React, { Component } from "react";
import { connect } from "react-redux";

import TopMenu from "./TopMenu";
import ItemsList from "./ItemsList";
import AddButton from "./AddButton";
import ProjectsList from "./ProjectsList";
import BreadcrumbMenu from "./BreadcrumbMenu";
import DownloadButton from "./DownloadButton";
import Login from "./Login";
import PasswordChange from "./PasswordChange";
import Loading from "./Loading";

const mapStateToProps = (state) => {
  return { authentication: state.authenticationReducer };
};

class MainPage extends Component {
  render() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectName = urlParams.get("projectName");
    const insideFolder = urlParams.get("type");
    var items;
    var topButton;
    var content;
    if (insideFolder && !this.props.authentication.toMain) {
      //invoices or excel
      items = <ItemsList type="inside" />;
      topButton = <AddButton />;
    } else if (projectName && !this.props.authentication.toMain) {
      items = <ProjectsList type="inside" projectName={projectName} />;
      topButton = <DownloadButton />;
    } else {
      items = <ProjectsList />;
      topButton = <AddButton projectName="none" />;
    }
    var loggedIn = false;
    var changePassword = false;
    if (this.props.authentication.user) {
      loggedIn = true;
      if (this.props.authentication.user.isFirstPassword) {
        changePassword = true;
      }
    }
    if (this.props.authentication.pending) {
      content = <Loading />;
    } else {
      if (loggedIn && changePassword) {
        content = <PasswordChange />;
      } else if (loggedIn && !changePassword) {
        content = (
          <div>
            {topButton}
            <div className="container">
              <BreadcrumbMenu
                projectName={projectName}
                insideFolder={insideFolder}
              />
              {items}
            </div>
          </div>
        );
      } else {
        content = <Login />;
      }
    }
    return (
      <React.Fragment>
        <TopMenu />
        {content}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(MainPage);
