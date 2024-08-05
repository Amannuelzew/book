import { getCurrentUser } from "@/utils/user";
import OwnerBooks from "@/components/OwnerBooks";

const OwnerBooksPage = async () => {
  const user = await getCurrentUser();

  return <OwnerBooks user={user!} />;
};

export default OwnerBooksPage;
