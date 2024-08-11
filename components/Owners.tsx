"use client";
import { routedefineAbilityFor } from "@/utils/ability";
import { Grid, Typography, Box } from "@mui/material";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import OwnersTable from "./OwnersTable";
type owners = {
  user: {
    email: string;
    phoneNumber: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  location: string;
  approved: boolean;
  disabled: boolean;
  userId: string;
  _count: {
    user: number;
    books: number;
  };
};
const Owners = ({ user, owners }: { user: User; owners: owners[] }) => {
  //based on access control defined users of type role[ADMIN] can only visit this page
  const ability = routedefineAbilityFor(user);

  return (
    <>
      {ability.can("read", "/owners") ? (
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
            <OwnersTable data={owners} />
          </Grid>
        </Grid>
      ) : ability.can("read", "/dashboard") ? (
        redirect("/dashboard")
      ) : (
        redirect("/books")
      )}
    </>
  );
};

export default Owners;
