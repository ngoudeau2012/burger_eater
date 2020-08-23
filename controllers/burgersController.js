var express = require("express");
const router = express.Router();

// Import the model (burgers.js) to use its database functions.
var burgers = require("../models/burgers.js");

// GET ALL BURGERS ROUTE -- html route
router.get("/", function (req, res) {
  burgers.selectAll((data) => {
    let burgers = { burgerInst: data };
    res.render("index", burgers);
  });
});

// INSERT ROUTE
router.post("/api/burgers", function (req, res) {
  burgers.insertOne(req.body.burger_name, (result) => {
    res.json({ id: result.insertId });
  });
});

// UPDATE DEVOURED
router.put("/api/burgers/:id", function (req, res) {
  let burgerID = req.params.id;

  burgers.updateDevoured(req.body.devoured, burgerID, (result) => {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// DELETE ROUTE
router.delete("/api/burgers/:id", function (req, res) {
  let burgerID = req.params.id;

  burgers.deleteOne(burgerID, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
