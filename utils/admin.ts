"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";
import { accessibleBy } from "@casl/prisma";
import { defineAbilityFor } from "./ability";
import { Book } from "@prisma/client";
type books = {
  category: { id: string; createdAt: Date; updatedAt: Date; name: string };
  owner: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    location: string;
    approved: boolean;
    disabled: boolean;
    userId: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  title: string;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const getbooks = async () => {
  //books are filterd based casl access control defn
  const user = await getCurrentUser();
  const ability = defineAbilityFor(user!);
  const books = await db.book.findMany({
    where: accessibleBy(ability).Book,
    include: { category: true, owner: true },
  });
  return books;
};
const getowners = async () => {
  //owners are filterd based casl access control defn
  const user = await getCurrentUser();
  const ability = defineAbilityFor(user!);
  const owners = await db.owner.findMany({
    where: accessibleBy(ability).Owner,
  });
  return owners;
};
export const approveOwner = async (id: string) => {
  const owners = await getowners();
  const owner = owners.filter((own) => own.id === id)[0];
  await db.owner.update({
    where: { id: owner!.id },
    data: {
      approved: !owner!.approved,
    },
  });
  revalidatePath("/owners");
};
export const disableOwner = async (id: string) => {
  const owners = await getowners();
  const owner = owners.filter((own) => own.id === id)[0];
  await db.owner.update({
    where: { id: owner!.id },
    data: {
      disabled: !owner.disabled,
    },
  });
  revalidatePath("/owners");
};
export const approveBook = async (id: string) => {
  const books = await getbooks();
  const book = books.filter((book) => book.id === id)[0];

  await db.book.update({
    where: { id: book!.id },
    data: {
      approved: !book.approved,
    },
  });
  // revalidatePath("/books");
};

//server side filtering
export const globalBookfilter = async (query: string) => {
  const books = await getbooks();
  const filter = books.filter(
    (book) =>
      book.owner.name.toLowerCase().startsWith(query) ||
      book.category.name.toLowerCase().startsWith(query) ||
      book.owner.location.toLowerCase().startsWith(query) ||
      book.author.toLowerCase().startsWith(query)
  );
  return filter;
};
export const bookFilterByColumns = async (
  query: [{ id: string; value: string }]
) => {
  const books = await getbooks();
  let list: books[] = [];
  for (let i = 0; i < query.length; i++) {
    if (query[i].id == "author")
      list = books.filter((book) =>
        book.author.toLowerCase().startsWith(query[i].value)
      );
    if (query[i].id == "owner.name")
      list = books.filter((book) =>
        book.owner.name.toLowerCase().startsWith(query[i].value)
      );
    else if (query[i].id == "owner.location")
      list = list.filter((book) =>
        book.owner.location.toLowerCase().startsWith(query[i].value)
      );
    else if (query[i].id == "category.name")
      list = list.filter((book) =>
        book.category.name.toLowerCase().startsWith(query[i].value)
      );
  }
  return list;
};
