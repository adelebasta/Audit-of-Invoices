import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectName: "",
      projectDescription: "",
      merchant: "",
      invoiceNr: "",
      issuedOn: "",
      currency: "",
      subtotal: "",
      vatPercent: "",
      vatTotal: "",
      total: "",
      createdAt: "",
      items: [],
      file: "",
      new: false,
      loading: false,
    };
    const offeredPriceTotal = this.props.item["offeredPriceTotal"]
      ? this.props.item["offeredPriceTotal"]
      : "";
    const offeredPrice = this.props.item["offeredPrice"]
      ? this.props.item["offeredPrice"]
      : "";
    const ean = this.props.item["ean"] ? this.props.item["ean"] : "";
    this.state = {
      _id: this.props.item["_id"],
      description: this.props.item["description"],
      grossPrice: this.props.item["grossPrice"],
      basisQuantity: this.props.item["basisQuantity"],
      discountPercent: this.props.item["discountPercent"],
      vatPercent: this.props.item["vatPercent"],
      totalWithTax: this.props.item["totalWithTax"],
      basisQuantityForDiscount: this.props.item["basisQuantityForDiscount"],
      merchantArticleId: this.props.item["merchantArticleId"],
      billedQuantity: this.props.item["billedQuantity"],
      subtotal: this.props.item["subtotal"],
      reducedItemPrice: this.props.item["reducedItemPrice"],
      ean: ean,
      offeredPriceTotal: offeredPriceTotal,
      offeredPrice: offeredPrice,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }
  async handleChange(e) {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    this.handleItemChange();
  }
  handleItemChange() {
    var itemState = this.state;
    this.props.handleItemChange(itemState);
  }
  render() {
    var showOfferedPrice = true;
    var showOfferedPriceTotal = true;
    if (this.state.offeredPrice !== "") {
      showOfferedPriceTotal = false;
    } else if (this.state.offeredPriceTotal !== "") {
      showOfferedPrice = false;
    }
    return (
      <div className="third-section" onSubmit={this.onTrigger}>
        <Form.Group>
          <Form.Label className="field__label">Artikelnummer</Form.Label>
          <Form.Control
            className="field__input__short"
            type="text"
            name="merchantArticleId"
            onChange={this.handleChange}
            value={this.state.merchantArticleId}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="field__label">EAN</Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="ean"
            onChange={this.handleChange}
            value={this.state.ean}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="field__label">Stückzahl</Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="billedQuantity"
            onChange={this.handleChange}
            value={this.state.billedQuantity}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="field__label">Stückkosten</Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="reducedItemPrice"
            onChange={this.handleChange}
            value={this.state.reducedItemPrice}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="field__label">Kosten gesamt</Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="subtotal"
            onChange={this.handleChange}
            value={this.state.subtotal}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="field__label">
            Angebotspreis pro Stück
          </Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="offeredPrice"
            onChange={this.handleChange}
            value={this.state.offeredPrice}
            disabled={!showOfferedPrice}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="field__label">Angebotspreis Insg.</Form.Label>
          <Form.Control
            className="field__input__short"
            type="number"
            name="offeredPriceTotal"
            onChange={this.handleChange}
            value={this.state.offeredPriceTotal}
            disabled={!showOfferedPriceTotal}
          />
        </Form.Group>
      </div>
    );
  }
}

export default ItemForm;
