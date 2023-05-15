const express = require("express");
const router = express.Router();
const invoiceService = require("./InvoiceService");

router.post("/", (req, res) => {
  console.log("POST route /invoices/ received JSON: " + JSON.stringify(req.body));
  invoiceService.createInvoice(req.body, function (err, invoice) {
    if (err) {
      res.status(503).send("Could not create invoice" + err);
    } else {
      res.send(invoice);
    }
  });
});

router.get('/readInvoice', function (req, res) {
  console.log("GET route /invoices/readInvoice received JSON: " + JSON.stringify(req.body));
  const pdfpath = "zugferd/RG_195_131013_5214227.pdf";
  invoiceService.getInvoiceDataForFrontendDisplay(pdfpath, function (err, invoice) {
    if (err) {
      console.log(err);
      res.send("Error occured: " + err);
    }
    else {
      console.log(invoice);
      res.send(invoice);
    }
  });
});

router.get("/", function (req, res) {
  invoiceService.getAllInvoices(function (err, invoices) {
    if (err) {
      res.send("Something went wrong " + err);
    } else {
      res.send(invoices);
    }
  });
});

router.get("/search", function (req, res) {
  invoiceService.searchInvoices(
    req.query.searchInvoice,
    function (err, invoices) {
      if (err) {
        res.send("Something went wrong " + err);
      } else {
        res.send(invoices);
      }
    }
  );
});

router.get("/invoicesOfProject/:projectName", function (req, res) {
  const requestedProjectId = req.params.projectName;
  invoiceService.getInvoicesOfProject(
    requestedProjectId,
    function (err, invoiceList) {
      if (err) {
        res.send("Something went wrong " + err);
      } else {
        res.send(invoiceList);
      }
    }
  );
});

router.get("/:invoiceId", function (req, res) {
  invoiceService.findInvoiceById(req.params.invoiceId, function (err, invoice) {
    if (err) {
      res.send("Something went wrong " + err);
    } else {
      res.send(invoice);
    }
  });
});

router.put("/:invoiceId", function (req, res) {
  invoiceService.updateInvoice(
    req.params.invoiceId,
    req.body,
    function (err, updatedInvoice) {
      if (err) {
        res.send("Something went wrong " + err);
      } else {
        res.send(updatedInvoice);
      }
    }
  );
});

router.delete("/:invoiceId", (req, res) => {
  const requestedInvoiceId = req.params.invoiceId;
  invoiceService.deleteInvoice(requestedInvoiceId, function (err, invoice) {
    if (err) {
      res.send("Error: " + err);
    } else {
      console.log("Deleted invoice: " + invoice);
      res.send(invoice);
    }
  });
});

router.post("/moveFile", function (req, res) {
  console.log("Received JSON: " + JSON.stringify(req.body));
  invoiceService.moveFile(
    req.body.selectedFile,
    req.body.newPath,
    function (err, file) {
      if (err) {
        console.log(err);
        res.send("Something went wrong");
      } else {
        res.send(file);
      }
    }
  );
});

module.exports = router;
