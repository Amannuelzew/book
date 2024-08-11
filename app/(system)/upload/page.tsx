import UploadForm from "@/components/UploadForm";
import db from "@/utils/db";
import { defineAbilityFor, routedefineAbilityFor } from "@/utils/ability";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/utils/user";
import { redirect } from "next/navigation";
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
  const ability = routedefineAbilityFor(user!);
  return (
    <>
      {ability.can("read", "/upload") ? (
        <UploadForm categories={categories} />
      ) : (
        redirect("/books")
      )}
    </>
  );
};

export default Uploadpage;
