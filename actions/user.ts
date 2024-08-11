"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

export const rentBook = async (id: string, ownerId: string, userId: string) => {
  const book = await db.book.findUnique({ where: { id } });
  // deduct 1 from quantity
  await db.book.update({
    where: { id },
    data: {
      quantity: book?.quantity! - 1,
    },
  });
  //change availablity status
  const b = await db.book.findUnique({ where: { id } });
  if (b!.quantity <= 0) {
    await db.book.update({
      where: { id },
      data: {
        available: false,
      },
    });
  }
  //imburse owner
  const owner = await db.owner.findUnique({ where: { id: ownerId } });
  await db.user.update({
    where: { id: owner?.userId },
    data: {
      wallet: { increment: book?.price },
    },
  });
  //add to rents tables
  await db.rental.upsert({
    where: { userId: userId },
    update: {
      books: {
        connect: { id },
      },
    },
    create: {
      userId: userId,
      books: {
        connect: { id },
      },
    },
  });
  revalidatePath("/books");
};
