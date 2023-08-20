var express = require("express");
const {
  fetch,
  insert,
  edit,
  deletion,
} = require("../controller/indexController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Server Reached");
});

// router to get data from db
router.get("/fetch", fetch);
// router for inserting new record in the db
router.post("/add", insert);
// router for editing existing records of the db
router.put("/edit/:id", edit);
// router for deleting a particular record based on id passed as parameter
router.delete("/contact/:id", deletion);

module.exports = router;
