const express = require("express");
const router = express.Router();

const {
  getProduks,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} = require("../controllers/produk");

const authMiddleware = require("../middleware/middleware");
const uploadProduk = require("../middleware/uploadProduk");

const uploadFields = uploadProduk.fields([
  {
    name: "cover",
    maxCount: 1,
  },
  {
    name: "file",
    maxCount: 1,
  },
]);

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get("/", getProduks);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get("/:id", authMiddleware, getProdukById);

router.post("/", authMiddleware, uploadFields, createProduk);

router.put("/:id", authMiddleware, uploadFields, updateProduk);

router.delete("/:id", authMiddleware, deleteProduk);

module.exports = router;
