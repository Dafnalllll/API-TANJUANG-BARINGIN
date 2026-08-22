const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const authRoutes = require("./routes/route");
const faqRoutes = require("./routes/faq");
const produkRoutes = require("./routes/produk");

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/produk", produkRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Tanjuang Baringin Running",
    timestamp: new Date(),
  });
});

module.exports = app;
