"use client";
import Submit from "./Submit";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUser } from "@/actions/auth";
import { Box, Grid } from "@mui/material";
import Links from "./Links";
const Signup = () => {
  const [state, action] = useFormState(registerUser, {
    error: null,
    message: null,
  });

  return (
    <Box sx={{ paddingX: 10, paddingY: 5, width: "70%" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", marginBottom: 2, gap: 3 }}
      >
        <Box>icon</Box>
        <Typography variant="h5">Book Rent</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Signup into Book Rent</Typography>
        <hr />
      </Box>
      <form action={action}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            error={state.error?.email?.length !== undefined}
            id="email"
            type="email"
            name="email"
            label="Email address"
            fullWidth
            helperText={state.error?.email && state.error?.email}
          />
          <TextField
            error={state.error?.password?.length !== undefined}
            id="password"
            type="password"
            name="password"
            label="password"
            size="medium"
            fullWidth
            helperText={state.error?.password && state.error?.password}
          />
          <TextField
            error={state.error?.confirmPassword?.length !== undefined}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="confirm Password"
            fullWidth
            helperText={
              state.error?.confirmPassword && state.error?.confirmPassword
            }
          />
          <TextField
            error={state.error?.location?.length !== undefined}
            id="location"
            name="location"
            label="location"
            fullWidth
            helperText={state.error?.location && state.error?.location}
          />
          <TextField
            error={state.error?.phoneNumber?.length !== undefined}
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            label="phone Number"
            fullWidth
            helperText={state.error?.phoneNumber && state.error?.phoneNumber}
          />

          <FormControl
            required
            error={state.error?.terms?.length != 0}
            sx={{ m: 1 }}
            variant="standard"
          >
            <FormControlLabel
              control={<Checkbox id="terms" name="terms" />}
              label="I accept the Terms and Conditions"
            />
            <FormHelperText>{state.error?.terms}</FormHelperText>
          </FormControl>

          <Submit label="SIGN IN" />
          <Typography align="center">
            Already have an account <Link href="/signin">Login</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
