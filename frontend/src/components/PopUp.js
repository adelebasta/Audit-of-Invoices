import React, { Component } from "react";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
  }
  deleteItem() {
    this.props.deleteItem();
  }
  hidePopUp() {
    this.props.hidePopUp();
  }
  render() {
    const display = this.props.display ? {} : { display: "None" };
    return (
      <div id="popUp" className="overlay" style={display}>
        <div className="popUp">
          <p className="popUp-headline">Wirklich löschen?</p>
          <div className="content">
            Bitte bestätigen Sie den Löschvorgang.
            <div className="section-button-popUp">
              <button
                className="btn btn-delete-popUp"
                type="submit"
                onClick={this.deleteItem}
              >
                Löschen
              </button>
              <div className="devider"></div>
              <button
                className=" btn btn-cancle-popUp"
                type="cancle"
                onClick={this.hidePopUp}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;
