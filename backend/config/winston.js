const appRoot = require("app-root-path");
const winston = require("winston");

// define the custom settings for each transport (file, console)
const options = {
  error_log: {
    level: "error",
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }, app_log: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }, console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.simple(),
    colorize: true,
  }
};

if (process.env.NODE_ENV === "production") {
  var transports = [new winston.transports.File(options.error_log), new winston.transports.File(options.app_log)];
} else {
  var transports = [new winston.transports.Console(options.console)];
}

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: transports,
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
