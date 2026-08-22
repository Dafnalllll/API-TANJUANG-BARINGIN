const prisma = require("../config/prisma");

const getProduks = async (req, res) => {
  try {
    const produks = await prisma.produk.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: produks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProdukById = async (req, res) => {
  try {
    const produk = await prisma.produk.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!produk) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: produk,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createProduk = async (req, res) => {
  try {
    const { badge, title, subtitle, description, buttonText } = req.body;

    const highlights = JSON.parse(req.body.highlights || "[]");

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Judul dan deskripsi wajib diisi",
      });
    }

    const cover = req.files?.cover?.[0]
      ? `/uploads/produk/cover/${req.files.cover[0].filename}`
      : null;

    const filePath = req.files?.file?.[0]
      ? `/uploads/produk/file/${req.files.file[0].filename}`
      : null;

    const produk = await prisma.produk.create({
      data: {
        badge,
        title,
        subtitle,
        description,
        highlights,
        cover,
        filePath,
        buttonText,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: produk,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduk = async (req, res) => {
  try {
    const { id } = req.params;

    const produk = await prisma.produk.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!produk) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    const { badge, title, subtitle, description, buttonText } = req.body;

    const highlights = JSON.parse(req.body.highlights || "[]");

    const cover = req.files?.cover?.[0]
      ? `/uploads/produk/cover/${req.files.cover[0].filename}`
      : produk.cover;

    const filePath = req.files?.file?.[0]
      ? `/uploads/produk/file/${req.files.file[0].filename}`
      : produk.filePath;

    const updatedProduk = await prisma.produk.update({
      where: {
        id: Number(id),
      },
      data: {
        badge,
        title,
        subtitle,
        description,
        highlights,
        cover,
        filePath,
        buttonText,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: updatedProduk,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;

    const produk = await prisma.produk.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!produk) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    await prisma.produk.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProduks,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
};
