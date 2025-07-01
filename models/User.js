// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ["student", "professor"] }
// });

// module.exports = mongoose.model("User", UserSchema);



const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: {
    type: String,
    enum: ["student", "professor", "admin"],
    default: "student",
    validate: {
      validator: async function (value) {
        if (value !== "admin") return true;

        const existingAdmin = await mongoose.models.User.findOne({ role: "admin" });

        // Allow if no admin exists or it's the same user (update case)
        if (!existingAdmin || existingAdmin._id.equals(this._id)) {
          return true;
        }

        return false;
      },
      message: "Only one admin is allowed in the system."
    }
  }
});

module.exports = mongoose.model("User", UserSchema);
