"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
export const approveOwner = async (id: string) => {
  //remove owner
  //casl
  const owner = await db.owner.findUnique({ where: { id } });
  await db.owner.update({
    where: { id: owner!.id },
    data: {
      approved: !owner!.approved,
    },
  });
  revalidatePath("/owners");
};
export const approveBook = async (id: string) => {
  //casl
  const book = await db.book.findUnique({ where: { id } });

  await db.book.update({
    where: { id: book!.id },
    data: {
      approved: !book!.approved,
    },
  });
  revalidatePath("/books");
};

export const disableOwner = async (id: string) => {
  //casl**
  const owner = await db.owner.findUnique({ where: { id } });
  await db.owner.update({
    where: { id: owner!.id },
    data: {
      disabled: !owner!.disabled,
    },
  });
  revalidatePath("/owner");
};
