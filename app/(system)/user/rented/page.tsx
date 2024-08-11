import { defineAbilityFor, routedefineAbilityFor } from "@/utils/ability";
import { getCurrentUser } from "@/utils/user";
import { accessibleBy } from "@casl/prisma";
import { User } from "@prisma/client";
import db from "@/utils/db";
import UsersRentsTable from "@/components/UserRentsTable";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
const getRents = async (user: User) => {
  const ability = defineAbilityFor(user!);
  const rental = await db.rental.findMany({
    where: accessibleBy(ability).Rental,
    include: { books: true },
  });
  return rental;
};

const UserBooksPage = async () => {
  const user = await getCurrentUser();
  const rental = await getRents(user!);
  const ability = routedefineAbilityFor(user!);
  return (
    <>
      {ability.can("read", "/user/rented") ? (
        <Box sx={{ mt: 2 }}>
          <UsersRentsTable data={rental} />
        </Box>
      ) : (
        redirect("/dashboard")
      )}
    </>
  );
};

export default UserBooksPage;
