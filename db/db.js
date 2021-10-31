var sqlite3 = require('sqlite3').verbose();
var path  = require("path")


// init the database
let db = new sqlite3.Database(path.join(__dirname,'gcs.db'), (err) => {
  if (err) {
    console.error(err.message);
  } else
    console.log('Connected to the chinook database.');
});

module.exports = db