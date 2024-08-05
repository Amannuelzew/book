import Owners from "@/components/Owners";
import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
const getOwners = () => {
  return db.owner.findMany({ include: { _count: true } });
};
const AdminOwnerspage = async () => {
  const user = await getCurrentUser();
  const owners = await getOwners();
  return <Owners user={user!} owners={owners} />;
};

export default AdminOwnerspage;
