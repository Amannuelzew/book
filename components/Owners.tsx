"use client";
import { routedefineAbilityFor } from "@/utils/ability";
import { Grid, Typography, Box } from "@mui/material";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import Table from "./Table";
import { ROLES } from "@/utils/constants";
type owners = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  approved: boolean;
  disabled: boolean;
  userId: string;
  _count: {
    user: number;
    books: number;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    location: string;
    phoneNumber: string;
    image: string;
    role: string;
    wallet: number;
  } | null;
};
const Owners = ({ user, owners }: { user: User; owners: owners[] }) => {
  //based on access control defined users of type role[ADMIN] can only visit this page
  const ability = routedefineAbilityFor(user);

  return (
    <>
      {ability.can("read", "/dashboard") ? (
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
            <Box display={"inline"}>/Owners</Box>
          </Grid>
          <Grid
            item
            sm={12}
            sx={{ p: 2, borderRadius: "10px", backgroundColor: "white" }}
          >
            <Typography fontSize={20} fontWeight={"bold"} sx={{ my: 2 }}>
              List of Owners
            </Typography>
            <Table data={owners} />
          </Grid>
        </Grid>
      ) : user.role == ROLES.owner ? (
        redirect("/dashboard")
      ) : (
        redirect("/user/books")
      )}
    </>
  );
};

export default Owners;
