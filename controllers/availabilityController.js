const Availability = require("../models/Availability");
const User = require("../models/User");

exports.setAvailability = async (req, res) => {
  try {
    const { slots } = req.body;

    if (req.user.role !== "professor") {
      return res.status(403).json({ msg: "Only professors can set availability" });
    }

    let availability = await Availability.findOne({ professor: req.user.id });
    if (availability) {
      // Update existing slots
      availability.slots = slots;
      await availability.save();
    } else {
      // Create new
      availability = new Availability({ professor: req.user.id, slots });
      await availability.save();
    }

    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({ professor: req.params.professorId });

    if (!availability) {
      return res.status(404).json({ msg: "No availability found" });
    }

    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
