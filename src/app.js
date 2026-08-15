const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/route");
const faqRoutes = require("./routes/faq");

app.use(cors());

const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/faq", faqRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Tanjuang Baringin Running",
  });
});

module.exports = app;
