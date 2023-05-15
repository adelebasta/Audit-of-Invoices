const Item = require("./ItemModel");


function createItem(props, callback) {
    const item = new Item(props);

    // const pattern = date.compile('YYYY/MM/DD'); //HH:mm:ss'
    // item.timestampAsString = date.format(item.timestamp, pattern);
    item.save((err) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
}

function getAllItems(callback) {
    Item.find(function (err, items) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, items);
    });
}

function getItemsOfInvoice(searchedInvoiceId, callback) {
    Item.find({ invoiceId: searchedInvoiceId }, function (err, items) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, items);
    });
}

function findItemById(searchedID, callback) {
    Item.findOne({ _id: searchedID }, function (err, searchRes) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, searchRes);
    });
}

function findLowestPriceOfArticleId(articleId, merchant, callback) {
    Item.find({ merchantArticleId : articleId, merchant: merchant }).sort({reducedItemPrice: 1})
    .exec(function(err, item) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, item[0].reducedItemPrice);
    });
}

function updateItem(id, updates, callback) {
    Item.findOne({ _id: id }, function (err, item) {
        if (err) {
            return callback(err, null);
        }
        item.set(updates);
        item.save((err) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, item);
        });
    });
}
/*
function updateItem(params, callback) {
    getItemConstructor(function (err, Item) {
        if (err) {
            return callback(err, null);
        }
        var update = { projectId: params.projectId, merchant: params.merchant, projectDescription: params.projectDescription, currency: params.currency, vatPercent: params.vatPercent };
        Item.findOneAndUpdate({ _id: params._id }, update, { omitUndefined: true }, function (err, updatedItem) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, updatedItem);
        });
    });
}*/

function deleteItem(requestedItemID, callback) {
    Item.findOneAndDelete({ _id: requestedItemID }, (err, item) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, item);
    });
}

module.exports = {
    createItem,
    getAllItems,
    getItemsOfInvoice,
    findItemById,
    updateItem,
    deleteItem,
    findLowestPriceOfArticleId,
  };
  
