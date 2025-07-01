const express = require("express");
const router = express.Router();
const { register, login, sayHello } = require("../controllers/authController");

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/hello", sayHello);

module.exports = router;
