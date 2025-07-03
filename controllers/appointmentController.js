const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

exports.bookAppointment = async (req, res) => {
  const { professorId, time } = req.body;

  try {
   
    const availability = await Availability.findOne({ professor: professorId });
  

       if (!availability.slots.some(slot => new Date(slot).toISOString() === new Date(time).toISOString())) {
            return res.status(400).json({ msg: "Slot not available" });
          
          }

    
    const appointment = new Appointment({
      student: req.user.id,
      professor: professorId,
      time
    });
    await appointment.save();

  
    availability.slots = availability.slots.filter(slot => slot !== time);
    await availability.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ msg: "Error booking appointment", error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ msg: "Appointment not found" });

    
    if (appointment.professor.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    appointment.status = "cancelled";
    await appointment.save();

   
    const availability = await Availability.findOne({ professor: req.user.id });
    if (availability) {
      availability.slots.push(appointment.time);
      await availability.save();
    }

    res.status(200).json({ msg: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ msg: "Error cancelling appointment", error: err.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const roleKey = req.user.role === "student" ? "student" : "professor";

    const appointments = await Appointment.find({
      [roleKey]: req.user.id,
      status: "booked"
    }).populate("student professor", "name email");

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching appointments", error: err.message });
  }
};
