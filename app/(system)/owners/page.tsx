import Owner from "@/components/Owner";
import { getCurrentUser } from "@/utils/user";
const AdminOwnerspage = async () => {
  const user = await getCurrentUser();
  return <Owner user={user!} />;
};

export default AdminOwnerspage;
