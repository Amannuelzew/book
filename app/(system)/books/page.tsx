import Books from "@/components/Books";
import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
import { defineAbilityFor } from "@/utils/ability";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
//get books based on role
const getBooks = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const books = await db.book.findMany({
    where: accessibleBy(ability).Book,
    include: { category: true, owner: true },
    orderBy: { createdAt: "desc" },
  });
  return books;
};
const AdminBookspage = async () => {
  //incase query params needed to be handeled
  //const query = searchParams?.query || "";
  //const books = await globalBookFilter(query);

  const user = await getCurrentUser();
  const books = await getBooks(user!);
  return <Books user={user!} data={books} />;
};

export default AdminBookspage;
//incase query params needed to be handeled
/* export const globalBookFilter = async (query: string) => {
  const user = await getCurrentUser();
  const ability = defineAbilityFor(user!);
  const books = await db.book.findMany({
    where: accessibleBy(ability).Book,
    include: { category: true, owner: true },
  });
  const filter = books.filter((book) => book.owner.name.startsWith(query));
  return filter;
}; */
