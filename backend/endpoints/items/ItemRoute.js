const express = require('express');
const router = express.Router();
const itemService = require('./ItemService');

router.post("/", (req, res) => {
  console.log("POST route /posts/ received JSON: " + JSON.stringify(req.body));
  itemService.createItem(req.body, function (err, item) {
    if (err) {
      res.status(503).send("Could not create item: " + err);
    } else {
      console.log("Created item " + item);
      res.send(item);
    }
  });
});

router.get("/", function (req, res) {
  itemService.getAllItems(function (err, items) {
    if (err) {
      res.status(503).send("Could not get all items: " + err);
    } else {
      res.send(items);
    }
  });
});

router.get("/itemsOfInvoice/:invoiceId", function (req, res) {
  const requestedInvoiceId = req.params.invoiceId;
  itemService.getItemsOfInvoice(requestedInvoiceId, function (err, itemsList) {
    if (err) {
      res.status(503).send("Could not get items of requested invoice: " + err);
    } else {
      res.send(itemsList);
    }
  });
});

router.get("/:itemId", function (req, res) {
  itemService.findItemById(req.params.itemId, function (err, item) {
    if (err) {
      res.status(503).send("Could not get item with requested id: " + err);
    } else {
      res.send(item);
    }
  });
});

router.put("/:itemId", function (req, res) {
  console.log("Received JSON: " + JSON.stringify(req.body));

  itemService.updateItem(
    req.params.itemId,
    req.body,
    function (err, updatedItem) {
      if (err) {
        res.status(503).send("Could not update item: " + err);
      } else {
        res.send(updatedItem);
      }
    }
  );
});

router.delete("/:itemId", (req, res) => {
  const requestedItemId = req.params.itemId;
  itemService.deleteItem(requestedItemId, function (err, item) {
    if (err) {
      res.status(503).send("Could not delete item: " + err);
    } else {
      res.send(item);
    }
  });
});

module.exports = router;