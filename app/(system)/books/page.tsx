import Books from "@/components/Books";
import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
const getBooks = () => {
  return db.book.findMany({ include: { category: true, owner: true } });
};
const AdminBookspage = async () => {
  const user = await getCurrentUser();
  const books = await getBooks();
  console.log(books.length, "have");
  return <Books user={user!} books={books} />;
};

export default AdminBookspage;
