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

router.get("/fetch", fetch);
router.post("/add", insert);
router.put("/edit/:id", edit);
router.delete("/contact/:id", deletion);

module.exports = router;
