const express = require("express");
const router = express.Router();
var path = require("path");
const UploadService = require("./UploadService");
const InvoiceService = require("../invoices/InvoiceService");

router.post("/", function (req, res) {
  UploadService.uploadFile(req.files, function (err, pdfpath) {
    if (err) {
      res.send("Something went wrong " + err);
    } else {
      InvoiceService.getInvoiceDataForFrontendDisplay(
        pdfpath,
        function (err, result) {
          if (err) {
            res.send("Something went wrong " + err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});

router.get("/:file", (req, res, next) => {
  var url = __dirname;
  if (req.query["type"] === "temp") {
    url += "/UploadedFiles/dev/" + req.query["type"] + "/" + req.params.file;
  } else {
    url += "/UploadedFiles/dev/Projekte/" + req.query["projectName"] + "/" + req.query["type"] + "/" + req.params.file;
  }
  if (process.env.NODE_ENV === "production") {
    url = url.replace("/dev", "");
  }
  res.sendFile(path.join(url));
});

module.exports = router;
