import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import About from "./components/About";
import Impressum from "./components/Impressum";
import MainPage from "./components/MainPage";
import InvoiceEdit from "./components/InvoiceEdit";
import Search from "./components/Search";

import "./layout/styles/main.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/impressum" component={Impressum} />
          <Route
            exact
            path="/search"
            component={(props) => <Search {...props} key={Date.now()} />}
          />
          <Route
            exact
            path="/invoices/edit/:invoiceId"
            component={() => <InvoiceEdit />}
          />
          <Route exact path="/invoices/create" component={InvoiceEdit} />
        </Switch>
      </div>
    );
  }
}

export default App;
