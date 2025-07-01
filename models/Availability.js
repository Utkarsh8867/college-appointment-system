const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slots: [{ type: Date }]
}, { timestamps: true });

module.exports = mongoose.model("Availability", AvailabilitySchema);
