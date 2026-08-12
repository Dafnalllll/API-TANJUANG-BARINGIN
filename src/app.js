const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/route");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Tanjuang Baringin Running",
  });
});

module.exports = app;
