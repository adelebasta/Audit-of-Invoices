const fs = require("fs");
var rimraf = require("rimraf");
const InvoiceService = require("../invoices/InvoiceService");
const ExcelService = require("../utils/Excel");

function getAllProjectNames(callback) {
    var projectsPath = "./endpoints/fileUpload/UploadedFiles/dev/Projekte/";
    if (process.env.NODE_ENV === "production") {
        projectsPath = projectsPath.replace("/dev", "");
    }
    fs.readdir(projectsPath, (err, files) => {
        if (err) {
            return callback(err, null);
        }
        var allProjectNames = [];
        files.forEach(file => {
            allProjectNames.push(file);
        });
        return callback(null, allProjectNames);
    });
}

async function deleteProject(projectName, callback) {
    const allProjectNames = await getAllProjectNamesWrapper();
    if(!allProjectNames.includes(projectName)){
        return callback("Project " + projectName + " does not exist.", null);
    }
    var projectDir = "./endpoints/fileUpload/UploadedFiles/dev/Projekte/" + projectName + "/";
    if (process.env.NODE_ENV === "production") {
        projectDir = projectDir.replace("/dev", "");
    }
    const invoicesOfProject = await ExcelService.getInvoicesOfProjectWrapper(projectName);
    for (const invoice of invoicesOfProject) {
        const deletedInvoice = await getDeleteInvoiceWrapper(invoice._id);
        console.log(deletedInvoice);
    }
    rimraf(projectDir, function (err) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, "Project deleted successfully");
    });
}

function getAllProjectNamesWrapper() {
    return new Promise((resolve, reject) => {
        getAllProjectNames(function (err, projectNames) {
            if (err) {
                reject(err);
            } else {
                resolve(projectNames);
            }
        });
    });
}

function getDeleteInvoiceWrapper(invoiceId) {
    return new Promise((resolve, reject) => {
        InvoiceService.deleteInvoice(invoiceId, function (err, deletedInvoice) {
            if (err) {
                reject(err);
            } else {
                resolve(deletedInvoice);
            }
        });
    });
}

module.exports = {
    getAllProjectNames,
    deleteProject,
}