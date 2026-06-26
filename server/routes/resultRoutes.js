const express = require("express");
const router = express.Router();

const {
  getResults,
  getSingleResult,
  addResult,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

router.get("/", getResults);
router.get("/:id", getSingleResult);
router.post("/", addResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

module.exports = router;