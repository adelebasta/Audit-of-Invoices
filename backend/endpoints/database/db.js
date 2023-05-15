const mongoose = require("mongoose");
const logger = require("../../config/winston");
const userService = require("../users/UserService");

let database;

function initDB(callback) {
  if (database) {
    if (callback) {
      return callback(null, database);
    } else {
      return database;
    }
  } else {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    database = mongoose.connection;

    database.on("error", console.error.bind(console, "connection error: "));
    database.once("open", function () {
      if(process.env.NODE_ENV !== "production"){
        logger.info(`Connected to database ${process.env.MONGODB_URI}`);
      }
      userService.initPassword(function(err, user){
        if(err){
          return callback(err, null);
        }
        callback(null, database);
      });
      
    });
    process.on("SIGINT", () => {
      database.close(() => {
        console.log("Disconnected from mongoose!");
        process.exit(0);
      });
    });
  }
}

//is this needed?
function close() {
  if (mongoose) {
    console.log("Close mongoose");
    database.close();
  }
}

module.exports = {
  initDB,
  close,
};
