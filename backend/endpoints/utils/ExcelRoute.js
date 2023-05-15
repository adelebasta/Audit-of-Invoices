const express = require("express");
const router = express.Router();
const excel = require("./Excel");
const path = require("path");

router.get("/:projectName", function (req, res) {
  console.log(
    "GET route /invoices/test received JSON: " + JSON.stringify(req.body)
  );
  excel.createExcel(req.params.projectName, function (err, filePath) {
    if (err) {
      console.log(err);
      res.send("Error occured");
    } else if (filePath) {
      var fileName = filePath.split("Excel/")[1];
      res.download(path.join(__dirname, "../",) + filePath, fileName);
    }
  });
});

//download route not needed?
router.get("/download/:file", (req, res, next) => {
  var reqPath = path.join(__dirname, "../");
  var url = reqPath + "fileUpload/UploadedFiles/dev/Projekte/" + req.query["projectName"] + "/" + req.query["type"] + "/" + req.params.file;
  if (process.env.NODE_ENV === "production") {
    var url = url.replace("/dev", "");
  }
  res.download(path.join(url));
});

router.get("/files/:projectName", function (req, res) {
  excel.getExcelNames(req.params.projectName, function (err, excelNames) {
    if (err) {
      res.send("Something went wrong " + err);
    } else {
      res.send(excelNames);
    }
  });
});

router.delete("/delete/:projectName/:fileName", function(req, res) {
  excel.deleteExcel(req.params.projectName, req.params.fileName, function(err, deletedFile) {
    if (err) {
      res.send("Something went wrong: " + err);
    } else {
      res.send(deletedFile);
    }
  });
});

module.exports = router;
