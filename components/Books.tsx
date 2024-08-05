"use client";
import { Box, Grid, Typography } from "@mui/material";
import Table from "@/components/OwnersTable";
import { routedefineAbilityFor } from "@/utils/ability";
import { Book, User } from "@prisma/client";
import { redirect } from "next/navigation";
import BooksTable from "./BooksTable";
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
    approved: boolean;
    disabled: boolean;
    userId: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  title: string;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const Books = ({ user, books }: { user: User; books: books[] }) => {
  const ability = routedefineAbilityFor(user);
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
              Admin
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
            <BooksTable data={books} />
          </Grid>
        </Grid>
      ) : user.role == "OWNER" ? (
        redirect("/dashboard")
      ) : (
        redirect("/user/books")
      )}
    </>
  );
};

export default Books;
