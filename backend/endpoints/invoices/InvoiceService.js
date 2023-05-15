var fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { DOMParser } = require("xmldom");
const Invoice = require("./InvoiceModel");
const Item = require("../items/ItemModel");
const ItemService = require("../items/ItemService");
const exec = require("child_process").exec;

async function getInvoiceDataForFrontendDisplay(pdfpath, callback) {
  console.log(pdfpath);
  const javaXMLextraction = await execShellCommand(
    "java -jar pdfXMLextractor-1.0-jar-with-dependencies.jar " + pdfpath
  );

  console.log(javaXMLextraction);
  console.log("OUTSIDE OF JAVA NOW!");

  if (javaXMLextraction.includes("!!Fehlermeldung!!:")) {
    //checks for error and does early exit
    return callback(javaXMLextraction, null);
  }

  var pathIndex = javaXMLextraction.lastIndexOf("XML extracted to: ");
  var xmlpath = javaXMLextraction.substr(pathIndex + 18).trim();

  //AM ENDE MUSS XML DELETED WERDEN, EVEN IF ERROR, also vlt im Router?

  //XML parsing variables
  //var xml = fs.readFileSync("./zugferd/ZUGFeRD-invoice.xml", "utf8");
  var xml = fs.readFileSync(xmlpath, "utf8");
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");

  //variables for creating JSON objects for items
  var itemArray = new Array(loopIterations);

  //variables for creating JSON object for invoice
  var dateString =
    xmlDoc.getElementsByTagName("udt:DateTimeString")[0].childNodes[0]
      .nodeValue;
  var date =
    dateString.substring(6, 8) +
    "." +
    dateString.substring(4, 6) +
    "." +
    dateString.substring(0, 4);

  //for loop variables
  var loopIterations = xmlDoc.getElementsByTagName(
    "ram:IncludedSupplyChainTradeLineItem"
  ).length;

  //creating invoice JSON object
  var invoice = {
    merchant:
      xmlDoc.getElementsByTagName("ram:Name")[1].childNodes[0].nodeValue,
    invoiceNr: xmlDoc.getElementsByTagName("ram:ID")[1].childNodes[0].nodeValue,
    issuedOn: date,
    projectDescription:
      xmlDoc.getElementsByTagName("ram:BuyerReference")[0].childNodes[0]
        .nodeValue,
    currency: xmlDoc.getElementsByTagName("ram:InvoiceCurrencyCode")[0]
      .childNodes[0].nodeValue,
    subtotal: xmlDoc.getElementsByTagName("ram:TaxBasisTotalAmount")[0]
      .childNodes[0].nodeValue,
    vatPercent: +(
      xmlDoc.getElementsByTagName("ram:ApplicablePercent")[0].childNodes[0]
        .nodeValue / 100
    ),
    vatTotal:
      xmlDoc.getElementsByTagName("ram:TaxTotalAmount")[0].childNodes[0]
        .nodeValue,
    total: xmlDoc.getElementsByTagName("ram:GrandTotalAmount")[0].childNodes[0]
      .nodeValue,
    file: pdfpath,
    items: itemArray,
  };

  //creating items JSON objects
  var discountedItemsCount = 0;
  for (var i = 0; i < loopIterations; i++) {
    var subtotal = xmlDoc.getElementsByTagName("ram:LineTotalAmount")[1 + i]
      .childNodes[0].nodeValue;
    var vatPercent = +(
      xmlDoc.getElementsByTagName("ram:ApplicablePercent")[1 + i].childNodes[0]
        .nodeValue / 100
    );
    var totalWithTax = +subtotal + +(subtotal * vatPercent);
    var item = {
      invoiceId: "",
      description:
        xmlDoc.getElementsByTagName("ram:Name")[5 + i].childNodes[0].nodeValue,
      merchantArticleId: xmlDoc.getElementsByTagName("ram:SellerAssignedID")[i]
        .childNodes[0].nodeValue,
      grossPrice:
        xmlDoc.getElementsByTagName("ram:ChargeAmount")[i * 2].childNodes[0]
          .nodeValue,
      basisQuantity:
        xmlDoc.getElementsByTagName("ram:GrossPriceProductTradePrice")[i].childNodes[1].nodeValue,
      discountPercent:"",
      reducedItemPrice:
        xmlDoc.getElementsByTagName("ram:ChargeAmount")[1 + i * 2].childNodes[0]
          .nodeValue,
      basisQuantityForDiscount:"",
      billedQuantity:
        xmlDoc.getElementsByTagName("ram:BilledQuantity")[i].childNodes[0]
          .nodeValue,
      subtotal: subtotal,
      vatPercent: vatPercent,
      totalWithTax: totalWithTax,
    };
    if (xmlDoc.getElementsByTagName("ram:GrossPriceProductTradePrice")[i].childNodes[2] && xmlDoc.getElementsByTagName("ram:GrossPriceProductTradePrice")[i].childNodes[2].nodeName == "ram:AppliedTradeAllowanceCharge") {
      item.discountPercent = xmlDoc.getElementsByTagName("ram:ActualAmount")[discountedItemsCount].childNodes[0]
      .nodeValue / item.grossPrice;
      item.basisQuantityForDiscount = xmlDoc.getElementsByTagName("ram:AppliedTradeAllowanceCharge")[discountedItemsCount].childNodes[2].nodeValue;
      discountedItemsCount++;
    }
    invoice.items[i] = item;
  }
  var result = {
    invoice: invoice,
  };

  try {
    if (fs.existsSync(xmlpath)) {
      fs.unlinkSync(xmlpath); //if XML was created, delete after reading
    }
  } catch (err) {
    return callback(err, null);
  }
  return callback(null, result);
}

function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    console.log("EXECUTING JAVA NOW!");
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

function createInvoice(invoiceDetails, callback) {
  console.log("Executing createInvoice():");
  invoiceDetails.createdAt = null;
  var invoice = new Invoice(invoiceDetails);
  
  var pathAndName = invoice.file.split("temp/");
  const targetPath = pathAndName[0] + "Projekte/" + invoice.projectName + "/Rechnungen/" + pathAndName[1].substr(5);

  //bei allen errors die temporary PDF löschen!!
  moveFile(invoice.file, targetPath)
    .then(console.log("File moved successfully"))
    .catch(console.error);

  invoice.file = targetPath;
  invoice.items = [];
  invoice.save((err) => {
    if (err) {
      deleteFile(targetPath);
      return callback(err, null);
    }
    Object.entries(invoiceDetails.items).forEach((entry) => {
      var item = new Item(entry[1]);
      if (item.offeredPrice) {
        item.offeredPriceTotal = item.offeredPrice * item.billedQuantity;
      } else if (item.offeredPriceTotal) {
        item.offeredPrice = item.offeredPriceTotal / item.billedQuantity;
      }
      item.invoiceId = invoice._id;
      item.merchant = invoice.merchant;
      item.save((err) => {
        if (err) {
          deleteFile(targetPath);
          return callback(err, null);
          // if error in any item, delete invoice too
        }
      });
    });
    return callback(null, invoice);
  });
}

function getAllInvoices(callback) {
  console.log("GETING INVOCIES");
  Invoice.find(function (err, invoices) {
    if (err) {
      return callback(err, null);
    }
    return callback(null, invoices);
  });
}

function getInvoicesOfProject(searchedProjectName, callback) {
  Invoice.find({ projectName: searchedProjectName }, function (err, invoices) {
    console.log(searchedProjectName);
    if (err) {
      return callback(err, null);
    }
    return callback(null, invoices);
  });
}

function findInvoiceById(searchedID, callback) {
  Invoice.findOne({ _id: searchedID }, function (err, invoice) {
    if (err) {
      return callback(err, null);
    }
    Item.find({ invoiceId: searchedID }, function (err, items) {
      if (err) {
        return callback(err, null);
      }
      var invoiceWithItems = invoice.toJSON();

      var day = invoice.createdAt.getDate();
      var month = invoice.createdAt.getMonth()+1;
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      invoiceWithItems.createdAt = day + "." + month + "." + invoice.createdAt.getFullYear();

      invoiceWithItems.items = items;
      return callback(null, invoiceWithItems);
    });
  });
}

function updateInvoice(id, updates, callback) {
  Invoice.findOne({ _id: id }, function (err, invoice) {
    if (err) {
      return callback(err, null);
    }
    invoice.set(updates);
    invoice.save((err) => {
      if (err) {
        return callback(err, null);
      }
      // update each item of the invoice
      for (const i in updates.items) {
        var item = updates.items[i];
        
        if (item.offeredPrice) {
          item.offeredPriceTotal = item.offeredPrice * item.billedQuantity;
        } else if (item.offeredPriceTotal) {
          item.offeredPrice = item.offeredPriceTotal / item.billedQuantity;
        }
        ItemService.updateItem(
          item._id,
          item,
          (err, item) => {
            if (err) {
              return callback(err, null);
            }
            console.log("Saved item " + item);
          }
        );
      }
      return callback(null, invoice);
    });
  });
}

function searchInvoices(searchString, callback) {
  Invoice.find(
    { $or: [{ invoiceNr: { $regex: searchString } }, { merchant: { $regex: searchString } }, { projectName: { $regex: searchString } }, { projectDescription: { $regex: searchString } }, { issuedOn: { $regex: searchString } }]},
    function (err, invoices) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, invoices);
    }
  );
}

/*
function updateInvoice(params, callback) {
    getInvoiceConstructor(function (err, Invoice) {
        if (err) {
            return callback(err, null);
        }
        var update = { projectName: params.projectName, merchant: params.merchant, projectDescription: params.projectDescription, currency: params.currency, vatPercent: params.vatPercent };
        Invoice.findOneAndUpdate({ _id: params._id }, update, { omitUndefined: true }, function (err, updatedInvoice) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, updatedInvoice);
        });
    });
}*/

function deleteInvoice(requestedInvoiceID, callback) {
  Invoice.findOneAndDelete({ _id: requestedInvoiceID }, (err, invoice) => {
    if (err) {
      return callback(err, null);
    }
    Item.deleteMany({ invoiceId: requestedInvoiceID }).exec();
    console.log("Invoice with items deleted.");
    deleteFile(invoice.file);
    return callback(null, invoice);
  });
}

function deleteFile(file) {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
      console.log("File deleted.");
    }
  } catch (err) {
    console.log(err);
  }
}

async function moveFile(currentPath, newPath) {
  console.log("Executing moveFile():");

  // 1. Create the destination directory if it does not exist
  // Set the `recursive` option to `true` to create all the subdirectories
  await fsPromises.mkdir(path.dirname(newPath), { recursive: true });
  // 2. Rename the file (move it to the new directory)
  // Return the promise

  //console.log("Moved file from:\n" + currentPath + "\nto:\n" + newPath);
  return fsPromises.rename(currentPath, newPath);
}

module.exports = {
  getInvoiceDataForFrontendDisplay,
  createInvoice,
  getInvoicesOfProject,
  updateInvoice,
  deleteInvoice,
  findInvoiceById,
  getAllInvoices,
  moveFile,
  searchInvoices,
  deleteFile,
};
