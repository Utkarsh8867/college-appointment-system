const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
// const userRoutes = require('./routes/userRoutes');
const app = express();

// DB Connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/appointmentRoutes"));
app.use("/api/auth", require("./routes/availabilityRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
