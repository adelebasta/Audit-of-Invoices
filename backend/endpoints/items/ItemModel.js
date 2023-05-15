var mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, //Rechnung.db.id
    description: String,                                        //Uebergangsbogen Raxofix 20mm x  3/4" AG 90 Grad, Siliziumbronze, m.Pressanschl.
    merchantArticleId: String,                                  // RAFUB2020A
    merchant: String,                                           // Händler (aus Rechnung übernommen)
    ean: String,                                                // EAN
    grossPrice: Number,                                         // Stückpreis
    basisQuantity: Number,                                      // Auf welche Stückzahl bezieht sich der Stückpreis
    discountPercent: Number,                                    // Rabatt %
    reducedItemPrice: Number,                                   // Preis nach Abzug von Rabatt
    basisQuantityForDiscount: Number,                           // Auf welche Stückzahl bezieht sich die Kalkulation des Rabattes
    billedQuantity: Number,                                     // gekaufte Stückzahl
    subtotal: Number,                                           // nach Rabatt, billed Quantity, ohne Steuern
    vatPercent: Number,                                         // MwSt %
    totalWithTax: Number,                                       // (Stückpreis - Rabatt) * Menge + Mwst
    offeredPrice: Number,                                       // Angebotspreis pro Stück, manuell eingegeben
    //offeredPriceQuantity: Number,                               // Menge der Artikel auf die sich der Angebotspreis bezieht (z.B. 50 Stk. für 100 EUR), manuell eingegeben
    offeredPriceTotal: Number                                   // Angebotspreis insg. (für gekaufte Stückzahl), manuell eingegeben
}, { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
