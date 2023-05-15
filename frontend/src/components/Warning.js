import React, { Component } from "react";

class Warning extends Component {
  render() {
    return (
      <div className="modal-dialog" role="dialog">
        <div className="modal-content modal-edit">
          <div className="form-group">
            <p className="section-headline">Seite wirklich verlassen?</p>

            <div className="section-content">
              <p className="section-text1">
                Bitte bestätigen Sie die Rechnung <br /> bevor Sie die Seite
                verlassen.
              </p>
              <p className="section-text2">
                Die Rechnung wird sonst nicht hinzugefügt.
              </p>
            </div>

            <div className="section-button">
              <button className="btn btn-leaveSite" type="submit">
                Seite verlassen
              </button>

              <button className=" btn btn-cancle" type="cancle">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Warning;
