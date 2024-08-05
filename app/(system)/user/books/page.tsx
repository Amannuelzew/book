import { getCurrentUser } from "@/utils/user";
import UserBooks from "@/components/UserBooks";

const UserBooksPage = async () => {
  const user = await getCurrentUser();

  return <UserBooks user={user!} />;
};

export default UserBooksPage;
