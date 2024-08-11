/* import { PrismaClient } from "@prisma/client";

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
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 */
