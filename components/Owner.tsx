"use client";
import { routedefineAbilityFor } from "@/utils/ability";
import { Grid, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const Owner = ({ user }: { user: User }) => {
  //based on access control defined users of type role[ADMIN,OWNER] can only visit this page
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

export default Owner;
