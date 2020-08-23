// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString, [table], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function (table, columns, colVals, cb) {
    connection.query('INSERT INTO ?? (??) VALUES (?);', [table, columns, colVals], function(err, res) {
        if (err) throw err;
        cb(res);
    });
},
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function (table, setCol, setColVal, whereCol, whereColVal, cb) {
    connection.query('UPDATE ?? SET ?? = ? WHERE ?? = ?;', [table, setCol, setColVal, whereCol, whereColVal], function(err, res) {
        if (err) throw err;
        cb(res);
    });
},
deleteOne: function(table, columnName, columnVal, cb) {
  connection.query('DELETE FROM ?? WHERE ?? = ?;', [table, columnName, columnVal], function(err, res) {
      if (err) throw err;
      cb(res);
  });
}
};

// Export the orm object for the model (cat.js).
module.exports = orm;
