import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const run = async () => {
  await Promise.all(
    ["Fiction", "Self Help", "Business"].map(async (category) => {
      return prisma.category.create({
        data: {
          name: category,
        },
      });
    })
  );
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", salt),
      location: "Addis Ababa",
      phoneNumber: "0911221111",
      role: "ADMIN",
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
