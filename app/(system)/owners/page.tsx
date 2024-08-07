import Owners from "@/components/Owners";
import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
import { defineAbilityFor } from "@/utils/ability";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
//get users based on role
const getOwners = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const owners = await db.owner.findMany({
    where: accessibleBy(ability).Owner,
    include: { _count: true },
  });
  return owners;
};
const AdminOwnerspage = async () => {
  const user = await getCurrentUser();
  const owners = await getOwners(user!);
  return <Owners user={user!} owners={owners} />;
};

export default AdminOwnerspage;
