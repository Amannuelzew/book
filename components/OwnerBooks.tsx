"use client";
import { User } from "@prisma/client";
import { Box, Grid, Typography } from "@mui/material";
import Table from "@/components/Table";
import { routedefineAbilityFor } from "@/utils/ability";
import { redirect } from "next/navigation";

const OwnerBooks = ({ user }: { user: User }) => {
  const ability = routedefineAbilityFor(user);
  return (
    <>
      {ability.can("read", "/book")
        ? "OwnerBooks"
        : user.role == "ADMIN"
        ? redirect("/dashboard")
        : redirect("/user/books")}
    </>
  );
};

export default OwnerBooks;
