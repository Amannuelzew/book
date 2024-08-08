"use client";
import { Box, Grid, Typography } from "@mui/material";
import { defineAbilityFor, routedefineAbilityFor } from "@/utils/ability";
import { redirect } from "next/navigation";
import AdminBooksTable from "./AdminBooksTable";
import { User } from "@prisma/client";
import OwnersBooksTable from "./OwnerBooksTable";
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
const Books = ({ user, data }: { user: User; data: books[] }) => {
  const ability = routedefineAbilityFor(user);
  const ablities = defineAbilityFor(user);
  return (
    <>
      {ability.can("read", "/books") ? (
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
            <Box display={"inline"} fontWeight="bold">
              {ablities.can("create", "Category") ? "Admin" : "Owner"}
            </Box>
            <Box display={"inline"}>/Books</Box>
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
            ) : (
              <OwnersBooksTable data={data} />
            )}
          </Grid>
        </Grid>
      ) : (
        redirect("/user/books")
      )}
    </>
  );
};

export default Books;
