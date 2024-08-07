import { getCurrentUser } from "@/utils/user";
import db from "@/utils/db";
import Dashboard from "@/components/Dashboard";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
import { defineAbilityFor } from "@/utils/ability";
const getCategories = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const categories = await db.category.findMany({
    where: accessibleBy(ability).Category,
    select: { _count: true, name: true },
  });
  return categories;
};
const colors = ["#49CA3A", "#FF2727", "#006AFE"];
const Dashbordpage = async () => {
  const user = await getCurrentUser();
  const categories = await getCategories(user!);

  const data = categories.map((cat, index) => ({
    value: cat._count.books,
    label: cat.name,
    color: colors[index],
  }));
  return <Dashboard user={user!} data={data} />;
};

export default Dashbordpage;
