const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  bookAppointment,
  cancelAppointment,
  getMyAppointments
} = require("../controllers/appointmentController");

// Book an appointment
router.post("/book", auth, bookAppointment);

// Cancel an appointment
router.delete("/:id", auth, cancelAppointment);

// Get my appointments (student or professor)
router.get("/myappointment", auth, getMyAppointments);

module.exports = router;
