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
  await Promise.all(
    ["user@gmail.com", "user1@gmail.com", "user2@gmail.com"].map(
      async (user) => {
        return prisma.user.upsert({
          where: { email: user },
          update: {},
          create: {
            email: user,
            password: bcrypt.hashSync("Aa!123456", salt),
            location: "Addis Ababa",
            phoneNumber: "0911221111",
          },
        });
      }
    )
  );

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      password: bcrypt.hashSync("Aa!123456", salt),
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
