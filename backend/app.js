const path = require("path");

if (process.env.NODE_ENV === "production") {
  console.log("The app started in production mode.");
  require("dotenv").config({ path: path.join(__dirname, '.env.production') });
} else if (process.env.NODE_ENV === "test") {
  console.log("The app started in test mode.");
  require("dotenv").config({ path: path.join(__dirname, '.env.test') });
} else {
  console.log("The app started in development mode.");
  require("dotenv").config({ path: path.join(__dirname, '.env.development') });
}

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./config/winston");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { isAuthenticated } = require("./endpoints/Authentication");

var indexRouter = require("./endpoints/index");
var invoicesRouter = require("./endpoints/invoices/InvoiceRoute");
var itemsRouter = require("./endpoints/items/ItemRoute");
var excelRouter = require("./endpoints/utils/ExcelRoute");
var fileUploadRouter = require("./endpoints/fileUpload/UploadRoute");
var projectsRouter = require("./endpoints/projects/ProjectRoute");
var usersRouter = require('./endpoints/users/UserRoute');
var sessionsRouter = require('./endpoints/sessions/SessionRoute');

const database = require("./endpoints/database/db");
const { callbackify } = require("util");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//to prevent cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested_With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);

// is this needed?
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  var dirpath = __dirname.replace("backend", "frontend");
  app.use(express.static(path.join(dirpath, "build")));
}
app.use("/", indexRouter);
app.use("/sessions", sessionsRouter);
app.all('*', isAuthenticated);
app.use("/invoices", invoicesRouter);
app.use("/items", itemsRouter);
app.use("/excel", (req, res, next) => {
  res.header(
    "Access-Control-Expose-Headers",
    "Content-Disposition"
  );
  next();
});
app.use("/excel", excelRouter);
app.use("/file-upload", fileUploadRouter);
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  res.status(404).send("Can't find the url.");
});

app.use(function (req, res, next) {
  res.status(500).send("Something is broken.");
});

database.initDB(function (err, db) {
  if (err) {
    console.log(err);
  }
});

module.exports = app;
