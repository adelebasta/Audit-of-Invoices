var mime = require('mime-types');
const path = require("path");
const logger = require('../../config/winston');

function uploadFile(files, callback) {
  //check if the files were added to the request
  if (!files || Object.keys(files).length === 0) {
    return callback("No files were uploaded", null);
  }
  const file = files.file;
  var randomString = Math.random().toString(36).substring(2, 7); //generate random string to avoid overwriting uploaded file
  var newName = randomString + file.name;

  if (mime.lookup(file.name) !== "application/pdf") {
    return callback("only pdf files allowed", null);
  }
  
  if (process.env.NODE_ENV === "production") {
    var tempPath = path.join(__dirname, "UploadedFiles", "temp");
  } else {
    var tempPath = path.join(__dirname, "UploadedFiles", "dev", "temp");
  }

  file.mv(tempPath + "/" + newName, (err) => {
    if (err) {
      return callback(err, null);
    }
    logger.info("File uploaded " + JSON.stringify(file));
    
    var pdfpath = "./endpoints/fileUpload/UploadedFiles/dev/temp/" + newName;
    if (process.env.NODE_ENV === "production") {
      pdfpath = pdfpath.replace("/dev", "");
    }
    return callback(null, pdfpath);
  });
}



module.exports = {
  uploadFile,
};
