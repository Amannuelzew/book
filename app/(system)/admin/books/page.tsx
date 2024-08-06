import Books from "@/components/Books";
import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
import { accessibleBy } from "@casl/prisma";
import { defineAbilityFor } from "@/utils/ability";
const getBooks = async () => {
  const user = await getCurrentUser();
  const ability = defineAbilityFor(user!);
  const boook = await db.book.findMany({ where: accessibleBy(ability).Book });
  return db.book.findMany({ include: { category: true, owner: true } });
};
const AdminAPIBookspage = async () => {
  const user = await getCurrentUser();
  const books = await getBooks();
  return <Books user={user!} books={books} />;
};

export default AdminAPIBookspage;
