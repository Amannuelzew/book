"use client";
import { editUser } from "@/actions/auth";
import { useFormState } from "react-dom";
import Submit from "./Submit";
import { User } from "@prisma/client";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const Account = ({ user }: { user: User }) => {
  const [state, action] = useFormState(editUser, {
    error: undefined,
    message: undefined,
  });
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber ? user.phoneNumber : ""
  );
  const [email, setEmail] = useState(user.email ? user.email : "");

  return (
    <>
      {user ? (
        <Box sx={{ paddingX: 10, paddingY: 2 }}>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Account Settings</Typography>
            <hr />
          </Box>

          <form action={action}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                error={state?.error?.email?.length !== undefined}
                id="email"
                type="email"
                name="email"
                label="Email address"
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={state?.error?.email && state?.error?.email}
              />
              <TextField
                error={state?.error?.location?.length !== undefined}
                id="location"
                name="location"
                label="Location"
                fullWidth
                size="small"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                helperText={state?.error?.location && state?.error?.location}
              />
              <TextField
                error={state?.error?.phoneNumber?.length !== undefined}
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                label="phone Number"
                fullWidth
                size="small"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                helperText={
                  state?.error?.phoneNumber && state?.error?.phoneNumber
                }
              />
              <TextField
                error={state?.error?.password?.length !== undefined}
                id="password"
                type="password"
                name="password"
                label="Current password"
                size="small"
                fullWidth
                helperText={state?.error?.password && state?.error?.password}
              />
              <TextField
                error={state?.error?.password?.length !== undefined}
                id="newpassword"
                type="password"
                name="newpassword"
                label="New password"
                size="small"
                fullWidth
                helperText={state?.error?.password && state?.error?.password}
              />
              <TextField
                error={state?.error?.confirmPassword?.length !== undefined}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="confirm Password"
                fullWidth
                size="small"
                helperText={
                  state?.error?.confirmPassword && state?.error?.confirmPassword
                }
              />

              <Typography
                sx={{ color: "red", fontsize: "12.33px" }}
                align="center"
              >
                {state?.message}
              </Typography>
              <Submit label="Update" />
            </Box>
          </form>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Account;
