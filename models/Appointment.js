const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: Date, required: true },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);
