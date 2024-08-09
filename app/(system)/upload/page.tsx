import UploadForm from "@/components/UploadForm";
import db from "@/utils/db";
import { defineAbilityFor } from "@/utils/ability";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/utils/user";
const getCategories = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const categories = await db.category.findMany({
    //where: accessibleBy(ability).Category,
    select: { name: true, id: true },
    orderBy: { createdAt: "desc" },
  });
  return categories;
};
const Uploadpage = async () => {
  const user = await getCurrentUser();
  const categories = await getCategories(user!);
  return <UploadForm categories={categories} />;
};

export default Uploadpage;
