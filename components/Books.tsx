"use client";
import { Box, Grid, Typography } from "@mui/material";
import Table from "@/components/Table";
import { routedefineAbilityFor } from "@/utils/ability";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const Book = ({ user }: { user: User }) => {
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
            <Table />
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

export default Book;
