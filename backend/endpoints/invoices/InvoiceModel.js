var mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    projectName: String, //bleibt beim Auslesen leer, muss vom Nutzer händisch zwecks Zusortierung eingetragen werden
    merchant: { type: String, unique: false }, //Bär & Ollenroth KG Brandenburg Fachgroßhandel f. Haustechnik
    invoiceNr: { type: String, unique: false, required: true }, //5209277 - Rechnungs Nummer
    issuedOn: String, //DateTimeString format="102">20200114</udt:DateTimeString
    projectDescription: String, //Pandion Viva (362WE) 4Living
    currency: String, //EUR
    subtotal: Number, //subtotal + 19% (Mwst) = total
    vatPercent: Number, //Mwst % (19%)
    vatTotal: Number, //19% des Subtotals
    total: Number, //Endsumme der Rechnung
    file: String,
  },
  { timestamps: true }
);
InvoiceSchema.index({ merchant: 1, invoiceNr: 1 }, { unique: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
