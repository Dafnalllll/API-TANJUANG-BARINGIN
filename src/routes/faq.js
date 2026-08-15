const express = require("express");
const router = express.Router();

const {
  getFaqs,
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faq");

const authMiddleware = require("../middleware/middleware");
const uploadFaq = require("../middleware/uploadFaq");

router.get("/", getFaqs);

router.get("/all", authMiddleware, getAllFaqs);

router.get("/:id", authMiddleware, getFaqById);

router.post("/", uploadFaq.single("file"), createFaq);

router.put("/:id", authMiddleware, updateFaq);

router.delete("/:id", authMiddleware, deleteFaq);

module.exports = router;
