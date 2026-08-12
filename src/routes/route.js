const express = require("express");
const router = express.Router();

const { login, profile, dashboard } = require("../controllers/auth");
const authMiddleware = require("../middleware/middleware");

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.get("/dashboard", authMiddleware, dashboard);

module.exports = router;
