import Book from "@/components/Books";
import { getCurrentUser } from "@/utils/user";

const AdminBookspage = async () => {
  const user = await getCurrentUser();
  return <Book user={user!} />;
};

export default AdminBookspage;
