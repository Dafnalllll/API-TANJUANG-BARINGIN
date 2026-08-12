const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

async function seedAdmin() {
  const email = "admintanjuangbaringin";
  const password = "TanjuangBaringin2026!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("Admin sudah ada");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: "Admin Nagari",
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin berhasil dibuat");
}

seedAdmin()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
