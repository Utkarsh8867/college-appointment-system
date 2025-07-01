const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { setAvailability, getAvailability } = require("../controllers/availabilityController");

// Professors add availability
router.post("/set", auth, setAvailability);

// Students view availability of a professor
router.get("/:professorId", auth, getAvailability);

module.exports = router;
