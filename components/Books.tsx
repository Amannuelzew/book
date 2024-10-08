"use client";
import { Box, Grid, Typography } from "@mui/material";
import { defineAbilityFor, routedefineAbilityFor } from "@/utils/ability";
import { redirect } from "next/navigation";
import AdminBooksTable from "./AdminBooksTable";
import { User } from "@prisma/client";
import OwnersBooksTable from "./OwnerBooksTable";
import UsersBooksTable from "./UsersBooksTable";
type books = {
  category: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  owner: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    image:string;
    location: string;
    approved: boolean;
    disabled: boolean;
    userId: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  title: string;
  available: boolean;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
type categoryProps = {
  id: string;
  name: string;
};
const Books = ({
  user,
  data,
  categories,
}: {
  user: User;
  data: books[];
  categories: categoryProps[];
}) => {
  const ability = routedefineAbilityFor(user);
  const ablities = defineAbilityFor(user);
  return (
    <>
      <Grid
        container
        direction={"row"}
        alignItems={"stretch"}
        sx={{ p: 1 }}
        gap={3}
      >
        <Grid
          sm={12}
          item
          sx={{ p: 2, borderRadius: "10px", backgroundColor: "white" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontSize={20} fontWeight={"bold"}>
              {ablities.can("create", "Book") ? "Owner" : "User"}
            </Typography>
            <Typography display={"inline"}>/Books</Typography>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          sx={{ p: 2, borderRadius: "10px", backgroundColor: "white" }}
        >
          <Typography fontSize={20} fontWeight={"bold"} sx={{ my: 2 }}>
            List of Books
          </Typography>

          {ablities.can("create", "Category") ? (
            <AdminBooksTable books={data} />
          ) : ablities.can("create", "Book") ? (
            <OwnersBooksTable books={data} categories={categories} />
          ) : (
            <UsersBooksTable data={data} userId={user.id} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Books;
