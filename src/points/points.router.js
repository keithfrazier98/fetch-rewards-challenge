const router = require("express").Router();
const controller = require("./points.controller");

router
  .route("/")
  .post(controller.addTransaction)
  .put(controller.spendPoints)
  .get(controller.pointBalance);

module.exports = router;
