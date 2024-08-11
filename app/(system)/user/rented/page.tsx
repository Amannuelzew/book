import { getCurrentUser } from "@/utils/user";

const UserBooksPage = async () => {
  const user = await getCurrentUser();

  return "rents";
};

export default UserBooksPage;
