// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

let burgers = {
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function (burgerName, cb) {
    orm.insertOne("burgers", "burger_name", burgerName, cb, function (res) {
      cb(res);
    });
  },
  // update devoured column to eaten -> default (false) to true
  updateDevoured: function (eatenBoolean, burgerID, cb) {
    console.log(eatenBoolean);
    orm.updateOne(
      "burgers",
      "devoured",
      eatenBoolean,
      "id",
      burgerID,
      cb,
      function (res) {
        cb(res);
      }
    );
  },
  deleteOne: function (id, cb) {
    orm.deleteOne("burgers", "id", id, function (res) {
      cb(res);
    });
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers;
