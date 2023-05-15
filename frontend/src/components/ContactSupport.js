import React, { Component } from "react";

class ContactSupport extends Component {
  constructor(props) {
    super(props);
    this.hidePopUp = this.hidePopUp.bind(this);
  }
  hidePopUp() {
    this.props.hidePopUp();
  }
  render() {
    const display = this.props.display ? {} : { display: "None" };
    return (
      <div id="popUp" className="overlay" style={display}>
        <div className="popUp-contact">
          <p className="popUp-headline">Haben Sie Ihr Passwort vergessen?</p>
          <div className="content-contact">
            Für die Lösung des Problems setzten Sie sich bitte mit dem Support
            in Verbindung:
            <span className="support-adress"> fa.support@gmail.com</span>
          </div>
          <div className="section-button-popUp">
            <button
              className=" btn btn-cancle-contact"
              type="cancle"
              onClick={this.hidePopUp}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactSupport;
