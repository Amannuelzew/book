import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
import Dashboard from "@/components/Dashboard";
import { accessibleBy } from "@casl/prisma";
import { Book, User } from "@prisma/client";
import { defineAbilityFor } from "@/utils/ability";
const getCategories = async (user: User, ownerId: string) => {
  const ability = defineAbilityFor(user!, ownerId);
  const categories = await db.category.findMany({
    where: accessibleBy(ability).Category,
    select: {
      id: true,
      _count: true,
      name: true,
      books: { include: { owner: true } },
    },
  });
  return categories;
};
const getOwners = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const owners = await db.owner.findMany({
    where: accessibleBy(ability).Owner,
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return owners;
};
const getBooks = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const books = await db.book.findMany({
    where: accessibleBy(ability).Book,
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
  return books;
};
const colors = ["#49CA3A", "#FF2727", "#006AFE"];
const Dashbordpage = async () => {
  const user = await getCurrentUser();
  const owners = await getOwners(user!);
  const a = owners.filter((own) => own.userId === user!.id);
  const currentOwner = a ? a[0] : { name: "", id: "" };
  const categories = await getCategories(user!, currentOwner?.id);
  const books = await getBooks(user!);
  //all books that belongs to this owner
  const ownerBooks = currentOwner
    ? books.filter((book) => book.ownerId === currentOwner?.id)
    : books;

  const count: any = [];
  //count books in every categories
  ownerBooks.reduce((acc: any, book: Book) => {
    count[book.categoryId] = (acc[book.categoryId] || 0) + 1;
    acc[book.categoryId] = (acc[book.categoryId] || 0) + 1;
    return acc;
  }, {});
  const data = categories.map((cat, index) => ({
    value: count[cat.id],
    label: cat.name,
    color: colors[index],
  }));
  const revenue = owners.reduce((sum, rev) => sum + rev.user.wallet, 0);
  return <Dashboard user={user!} data={data} revenue={revenue} books={books} />;
};

export default Dashbordpage;
