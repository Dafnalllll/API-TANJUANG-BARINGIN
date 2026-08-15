const prisma = require("../config/prisma");

const getFaqs = async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      where: {
        status: "ANSWERED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllFaqs = async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getFaqById = async (req, res) => {
  try {
    const faq = await prisma.faq.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createFaq = async (req, res) => {
  try {
    const { name, phone, address, category, question } = req.body;

    console.log("BODY =", req.body);
    console.log("FILE =", req.file);

    const uploadedFile = req.file ? `/uploads/faq/${req.file.filename}` : null;

    console.log("UPLOADED FILE =", uploadedFile);

    if (!name || !question) {
      return res.status(400).json({
        success: false,
        message: "Nama dan pertanyaan wajib diisi",
      });
    }

    const faq = await prisma.faq.create({
      data: {
        name,
        phone,
        address,
        category,
        question,
        file: uploadedFile,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Pertanyaan berhasil dikirim",
      data: faq,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, answer } = req.body;

    if (!answer || answer.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Jawaban wajib diisi",
      });
    }

    const faq = await prisma.faq.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    const updatedFaq = await prisma.faq.update({
      where: {
        id: Number(id),
      },
      data: {
        category,
        answer,
        status: "ANSWERED",
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedFaq,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await prisma.faq.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    await prisma.faq.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "FAQ berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getFaqs,
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
};
