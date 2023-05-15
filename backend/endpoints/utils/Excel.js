const ExcelJS = require("exceljs");
const itemService = require("../items/ItemService");
const invoiceService = require("../invoices/InvoiceService");
const { resolve } = require("app-root-path");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

async function createExcel(projectName, callback) {
  // initial workbook setup
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "FakturaAutomata";
  workbook.created = new Date(Date.now());
  workbook.calcProperties.fullCalcOnLoad = true;
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  // adding worksheets
  const worksheet = workbook.addWorksheet("Projektübersicht", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      showRowColHeaders: true,
      showGridLines: true,
      horizontalCentered: true,
    },
  });
  worksheet.state = "visible";
  const sumAndDiffSheet = workbook.addWorksheet("Rechnungssummen", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      showRowColHeaders: true,
      showGridLines: true,
      horizontalCentered: true,
    },
  });
  worksheet.state = "visible";

  // adding column scheme to worksheet
  worksheet.columns = [
    { header: "Projektname", key: "projectname", width: 20 },
    { header: "Rechnungssteller", key: "merchant", width: 20 },
    { header: "Rechnungsnummer", key: "invoiceNr", width: 18 },
    { header: "Rechnungsdatum", key: "issued", width: 17 },
    { header: "Artikelnummer", key: "articleId", width: 15 },
    { header: "EAN", key: "ean", width: 12 },
    { header: "Artikelbezeichnung", key: "articlename", width: 40 },
    { header: "Menge", key: "quantity", width: 12 },
    {
      header: "Stückpreis",
      key: "itemprice",
      width: 12,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Rabatt",
      key: "discount",
      width: 12,
      style: { numFmt: "0.00%" },
    },
    {
      header: "Rabattierter Stückpreis",
      key: "itempriceWithDiscount",
      width: 18,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Bestpreis",
      key: "bestprice",
      width: 12,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Stückpreis laut Angebot",
      key: "offeredPrice",
      width: 13,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Zwischensumme laut Rechnung",
      key: "sumWithoutVAT",
      width: 16,
      style: { numFmt: '#,##0.00"€";[Red]-#,##0.00"€"' },
    },
    { header: "MwSt", key: "vat", width: 12, style: { numFmt: "0.00%" } },
    {
      header: "Endsumme laut Angebot",
      key: "offerSum",
      width: 13,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Endsumme laut Rechnung",
      key: "invoiceSum",
      width: 14,
      style: { numFmt: '#,##0.00"€"' },
    },
    {
      header: "Differenz",
      key: "difference",
      width: 12,
      style: { numFmt: '#,##0.00"€";[Red]-#,##0.00"€"' },
    },
  ];

  worksheet.getRow(1).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  worksheet.getRow(1).font = { bold: true };

  //centering some columns
  worksheet.getColumn("C").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getColumn("D").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getColumn("E").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getColumn("F").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  // adding column scheme to sumAndDiffSheet
  sumAndDiffSheet.columns = [
    { header: "Rechnungssteller", key: "merchant", width: 30 },
    { header: "Rechnungsnummer", key: "invoiceNr", width: 20 },
    { header: "Rechnungssumme", key: "invoiceSum", width: 20 },
    { header: "Rechnungsverlust", key: "invoiceLoss", width: 20 },
  ];

  sumAndDiffSheet.getRow(1).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  sumAndDiffSheet.getRow(1).font = { bold: true };

  //centering some columns
  sumAndDiffSheet.getColumn("B").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  //initializing variables for total invoice difference calculation
  var firstElementOfInvoice = 2; //row number of first item of invoice
  var invoiceSumCheck = "SUM(";
  var invoiceIsNumberCheck = "IF(AND(";
  var invoiceFormula = "ABS(";

  var numberOfItemsInInvoices = []; //array which holds the number of items in each invoice of project

  // filling excel with invoice data
  const invoicesOfProject = await getInvoicesOfProjectWrapper(projectName);
  for (var invoice in invoicesOfProject) {
    const itemsOfInvoice = await getItemsOfInvoiceWrapper(
      invoicesOfProject[invoice]._id
    );

    //saving number of items of current invoice in array
    numberOfItemsInInvoices.push(itemsOfInvoice.length);

    var itemCount = 0; //counter for number of items in invoice
    for (var item in itemsOfInvoice) {
      //preparing formula string for excel fields which need to be calculated
      var offerSumString =
        "=IF(ISNUMBER(M" +
        (worksheet.rowCount + 1) +
        "),H" +
        (worksheet.rowCount + 1) +
        "*M" +
        (worksheet.rowCount + 1) +
        "+(H" +
        (worksheet.rowCount + 1) +
        "*M" +
        (worksheet.rowCount + 1) +
        "*" +
        itemsOfInvoice[item].vatPercent +
        '),"")';
      var differenceString =
        "=IF(ISNUMBER(P" +
        (worksheet.rowCount + 1) +
        "),P" +
        (worksheet.rowCount + 1) +
        "-Q" +
        (worksheet.rowCount + 1) +
        ",0)";
      //var dateString = convert(invoicesOfProject[invoice].issuedOn);

      const lowestPrice = await findLowestPriceOfArticleIdWrapper(
        itemsOfInvoice[item].merchantArticleId,
        itemsOfInvoice[item].merchant
      );

      //adding data to excel sheet
      worksheet.addRow({
        projectname: invoicesOfProject[invoice].projectName,
        merchant: itemsOfInvoice[item].merchant,
        invoiceNr: invoicesOfProject[invoice].invoiceNr,
        issued: invoicesOfProject[invoice].issuedOn,
        articleId: itemsOfInvoice[item].merchantArticleId,
        ean: itemsOfInvoice[item].ean,
        articlename: itemsOfInvoice[item].description,
        quantity: itemsOfInvoice[item].billedQuantity,
        itemprice: itemsOfInvoice[item].grossPrice,
        discount: itemsOfInvoice[item].discountPercent,
        itempriceWithDiscount: itemsOfInvoice[item].reducedItemPrice,
        bestprice: lowestPrice,
        offeredPrice: itemsOfInvoice[item].offeredPrice,
        sumWithoutVAT: itemsOfInvoice[item].subtotal,
        vat: itemsOfInvoice[item].vatPercent,
        offerSum: { formula: offerSumString },
        invoiceSum: itemsOfInvoice[item].totalWithTax,
        difference: { formula: differenceString },
      });
      //increasing counter for items in invoice
      itemCount++;

      //letting invoice numbers of articles appear red in case there are differences
      worksheet.addConditionalFormatting({
        ref: "C" + worksheet.rowCount,
        rules: [
          {
            type: "expression",
            formulae: ["R" + worksheet.rowCount + "< 0"],
            style: {
              fill: {
                type: "pattern",
                pattern: "solid",
                bgColor: { argb: "FFC7CE" },
              },
            },
          },
          {
            type: "expression",
            formulae: ["R" + worksheet.rowCount + "< 0"],
            style: { font: { color: { argb: "9C0006" } } },
          },
        ],
      });
    }
    worksheet.addRow({});

    // Creates 3 things:
    // 1) The first part of the formula string for total invoice difference
    // which takes care of the conditional formatting, in case one of the fields is empty
    // 2) The first part of the formula string for total invoice difference
    // which takes care of the conditional formatting, in case one of the fields is empty
    // 3) The second part of the formula string for total invoice difference
    // which takes care of getting the absolute value created from the sum of all item differences
    if (itemsOfInvoice.length == 1) {
      invoiceLossString = "IF(AND(ISNUMBER('Projektübersicht'!R" + firstElementOfInvoice + "),'Projektübersicht'!R" + firstElementOfInvoice + "<0),ABS('Projektübersicht'!R" + firstElementOfInvoice + "),0)"
      projectTotalSum = "'Rechnungssummen'!C" + startingRow;
    } else {
      for (
        var i = firstElementOfInvoice;
        i < itemCount + firstElementOfInvoice;
        i++
      ) {
        if (i == firstElementOfInvoice) {
          invoiceSumCheck = invoiceSumCheck + "'Projektübersicht'!R" + i + ",";
          invoiceFormula = invoiceFormula + "'Projektübersicht'!R" + i;
        } else if (i == itemCount + firstElementOfInvoice - 1) {
          invoiceSumCheck =
            invoiceSumCheck + "'Projektübersicht'!R" + i + ")<0),";
          invoiceFormula = invoiceFormula + "+'Projektübersicht'!R" + i + ")";
        } else {
          invoiceSumCheck = invoiceSumCheck + "'Projektübersicht'!R" + i + ",";
          invoiceFormula = invoiceFormula + "+'Projektübersicht'!R" + i;
        }
        invoiceIsNumberCheck =
          invoiceIsNumberCheck + "ISNUMBER('Projektübersicht'!R" + i + "),";
      }
      //building the actual formula for total invoice difference calculation in excel
      var invoiceLossString =
        invoiceIsNumberCheck + invoiceSumCheck + invoiceFormula + ",0)";
    }

    //increasing firstElementOfInvoice so that it points to the first item of the next invoice
    firstElementOfInvoice = firstElementOfInvoice + itemCount + 1;

    // filling the sumAndDiffSheet with data, containing an overview concerning invoice number, total of invoice and loss made in invoice
    sumAndDiffSheet.addRow({
      merchant: invoicesOfProject[invoice].merchant,
      invoiceNr: invoicesOfProject[invoice].invoiceNr,
      invoiceSum: invoicesOfProject[invoice].total,
      invoiceLoss: { formula: invoiceLossString },
    });

    //some formatting for the excel to make totals look like currency values
    sumAndDiffSheet.getCell("C" + sumAndDiffSheet.rowCount).numFmt =
      '#,##0.00"€";-#,##0.00"€"';
    sumAndDiffSheet.getCell("D" + sumAndDiffSheet.rowCount).numFmt =
      '[Red]#,##0.00"€";-#,##0.00"€"';

    // resetting both strings to their initial values, so that the formulas are only using
    // the items of the current invoice and not all of them
    invoiceIsNumberCheck = "IF(AND(";
    invoiceSumCheck = "SUM(";
    invoiceFormula = "ABS(";
  }

  // initializing variables for project total sum calculation
  var projectTotalSum = "";
  var projectTotalDifferenceFormatting = "IF(AND(";   //initializing format string
  var projectTotalDifferenceFormula = "ABS("; //initializing formula string
  var startingRow = 2;

  // Creates 3 things:
  // 1) The formula for project total sum calculation.
  // 2) The first part of the formula string for total project difference
  // which takes care of the conditional formatting, in case one of the fields is empty
  // 3) The second part of the formula string for total invoice difference
  // which takes care of getting the absolute value created from the sum of all item differences
  var projectTotalDifference = "";
  if (invoicesOfProject.length == 1) {
    projectTotalDifference = "IF(ISNUMBER('Rechnungssummen'!D" + startingRow + "),ABS('Rechnungssummen'!D" + startingRow + "),\"\")"
    projectTotalSum = "'Rechnungssummen'!C" + startingRow;
  } else {
    for (var i = 0; i < invoicesOfProject.length; i++) {
      if (i == 0) {
        projectTotalSum =
          projectTotalSum + "'Rechnungssummen'!C" + (startingRow + i);
        projectTotalDifferenceFormatting =
          projectTotalDifferenceFormatting +
          "ISNUMBER('Rechnungssummen'!D" +
          (startingRow + i) +
          "),";
        projectTotalDifferenceFormula =
          projectTotalDifferenceFormula +
          "'Rechnungssummen'!D" +
          (startingRow + i);
      }
      else if (i == invoicesOfProject.length - 1) {
        projectTotalSum =
          projectTotalSum + "+'Rechnungssummen'!C" + (startingRow + i);
        projectTotalDifferenceFormatting =
          projectTotalDifferenceFormatting +
          "ISNUMBER('Rechnungssummen'!D" +
          (startingRow + i) +
          ")),";
        projectTotalDifferenceFormula =
          projectTotalDifferenceFormula +
          "+'Rechnungssummen'!D" +
          (startingRow + i) +
          ")";
      } else {
        projectTotalSum =
          projectTotalSum + "+'Rechnungssummen'!C" + (startingRow + i);
        projectTotalDifferenceFormatting =
          projectTotalDifferenceFormatting +
          "ISNUMBER('Rechnungssummen'!D" +
          (startingRow + i) +
          "),";
        projectTotalDifferenceFormula =
          projectTotalDifferenceFormula +
          "+'Rechnungssummen'!D" +
          (startingRow + i);
      }
    }
    //building the actual formula for total project difference calculation in excel
    projectTotalDifference =
      projectTotalDifferenceFormatting + projectTotalDifferenceFormula + ',"")';
  }

  // adding both total of invoice and total invoice difference to the excel sheet plus some rows to increase readability
  worksheet.addRow({});
  worksheet.addRow({});
  worksheet.addRow({
    projectname: "Projektsumme:",
    merchant: { formula: projectTotalSum },
  });
  worksheet.addRow({
    projectname: "Projektverlust:",
    merchant: { formula: projectTotalDifference },
  });

  //some formatting for the excel to make totals bold, look like currency values and adding
  worksheet.getCell("A" + (worksheet.rowCount - 1)).font = {
    size: 16,
    bold: true,
  };
  worksheet.getCell("B" + (worksheet.rowCount - 1)).font = {
    size: 16,
    bold: true,
  };
  worksheet.getCell("B" + (worksheet.rowCount - 1)).numFmt = '#,##0.00"€"';
  worksheet.getCell("A" + worksheet.rowCount).font = { size: 16, bold: true };
  worksheet.getCell("B" + worksheet.rowCount).font = { size: 16, bold: true };
  worksheet.getCell("B" + worksheet.rowCount).numFmt =
    '[Red]#,##0.00"€";-#,##0.00"€"';

  //writing excel file and returning callback to finish the function
  var dateString = convert(new Date(Date.now()).toUTCString());
  var today = new Date();

  var hours = today.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  var minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var seconds = today.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var timeStamp = hours + "" + minutes + "" + seconds;

  var dateTime = dateString + '_' + timeStamp;

  var filepath = "/fileUpload/UploadedFiles/dev/Projekte/" + projectName + "/Excel/" + dateTime + "_" + projectName + ".xlsx";
  if(process.env.NODE_ENV === "production"){
    filepath = filepath.replace("/dev", "");
  }
  await fsPromises.mkdir(path.dirname("./endpoints" + filepath), {
    recursive: true,
  });
  await workbook.xlsx.writeFile("./endpoints" + filepath);
  return callback(null, filepath);
}

function convert(str) {
  var date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join("_");
}

function getInvoicesOfProjectWrapper(projectName) {
  return new Promise((resolve, reject) => {
    invoiceService.getInvoicesOfProject(projectName, function (err, invoices) {
      if (err) {
        reject(err);
      } else {
        resolve(invoices);
      }
    });
  });
}
function getItemsOfInvoiceWrapper(invoiceId) {
  return new Promise((resolve, reject) => {
    itemService.getItemsOfInvoice(invoiceId, function (err, items) {
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
}
function findLowestPriceOfArticleIdWrapper(articleId, merchant) {
  return new Promise((resolve, reject) => {
    itemService.findLowestPriceOfArticleId(
      articleId,
      merchant,
      function (err, lowestPrice) {
        if (err) {
          reject(err);
        } else {
          resolve(lowestPrice);
        }
      }
    );
  });
}

function getExcelNames(projectName, callback) {
  var excelFilesPath = "./endpoints/fileUpload/UploadedFiles/dev/Projekte/" + projectName + "/Excel/";
  if(process.env.NODE_ENV === "production"){
    excelFilesPath = excelFilesPath.replace("/dev", "");
  }
  fs.readdir(excelFilesPath, (err, files) => {
    if (err) {
      return callback(err, null);
    }
    var excelFilesNames = [];
    files.forEach((file) => {
      excelFilesNames.push(file);
    });
    return callback(null, excelFilesNames);
  });
}

function deleteExcel(projectName, fileName, callback) {
  var filePath = "./endpoints/fileUpload/UploadedFiles/dev/Projekte/" + projectName + "/Excel/" + fileName;
  if(process.env.NODE_ENV === "production"){
    filePath = filePath.replace("/dev", "");
  }
  fs.unlink(filePath, function (err) {
    if (err) {
      console.log(err)
      return callback("Excel file " + fileName + " could not be deleted or does not exist.", null);
    }
    return callback(null, "Excel sheet deleted successfully");
  });
}

module.exports = {
  createExcel,
  getExcelNames,
  getInvoicesOfProjectWrapper,
  deleteExcel,
};
