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
  const abebe = await prisma.user.upsert({
    where: { email: "abebe@gmail.com" },
    update: {},
    create: {
      email: "abebe@gmail.com",
      password: bcrypt.hashSync("Aa!123456", salt),
      location: "Addis Ababa",
      image: "/abebe.jpg",
      phoneNumber: "099221188",
      role: "OWNER",
    },
  });
  await prisma.owner.create({
    data: {
      userId: abebe.id,
      name: "abebe",
      location: abebe.location,
      image: "/abebe.jpg",
    },
  });
  const aster = await prisma.user.upsert({
    where: { email: "aster@gmail.com" },
    update: {},
    create: {
      email: "aster@gmail.com",
      password: bcrypt.hashSync("Aa!123456", salt),
      location: "Addis Ababa",
      image: "/aster.jpg",
      phoneNumber: "0900167891",
      role: "OWNER",
    },
  });
  await prisma.owner.create({
    data: {
      userId: aster.id,
      name: "aster",
      location: aster.location,
      image: "/aster.jpg",
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
