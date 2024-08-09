import db from "@/utils/db";

export const rentBook = async (id: string, ownerId: string) => {
  const book = await db.book.findUnique({ where: { id } });
  //change availablity status and deduct 1 from quantity
  await db.book.update({
    where: { id },
    data: {
      available: !book?.available,
      quantity: book?.quantity! - 1,
    },
  });
  //imburse owner
  const owner = await db.owner.findUnique({ where: { id: ownerId } });
  await db.user.update({
    where: { id: owner?.userId },
    data: {
      wallet: book?.price,
    },
  });
  //add to rents table
};
