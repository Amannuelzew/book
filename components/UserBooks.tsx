"use client";
import { User } from "@prisma/client";
import { Box, Grid, Typography } from "@mui/material";
import Table from "@/components/OwnersTable";
import { routedefineAbilityFor } from "@/utils/ability";
import { redirect } from "next/navigation";

const UserBooks = ({ user }: { user: User }) => {
  const ability = routedefineAbilityFor(user);
  return (
    <>
      {ability.can("read", "/user/books")
        ? "UserBooks"
        : redirect("/dashboard")}
    </>
  );
};

export default UserBooks;
