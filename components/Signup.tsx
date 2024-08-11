"use client";
import Submit from "./Submit";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUser } from "@/actions/auth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const Signup = () => {
  const [state, action] = useFormState(registerUser, {
    error: null,
    message: null,
  });

  return (
    <Box sx={{ paddingX: 10, paddingY: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 2,
          gap: 3,
          alignItems: "end",
        }}
      >
        <Box>
          <AutoStoriesIcon sx={{ color: "#02AAFF", fontSize: 40 }} />
        </Box>
        <Typography variant="h5">Book Rent</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Signup into Book Rent</Typography>
        <hr />
      </Box>

      <form action={action}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            required
            error={state?.error?.email?.length !== undefined}
            id="email"
            type="email"
            name="email"
            label="Email address"
            fullWidth
            size="small"
            helperText={state?.error?.email && state?.error?.email}
          />
          <TextField
            required
            error={state?.error?.password?.length !== undefined}
            id="password"
            type="password"
            name="password"
            label="password"
            size="small"
            fullWidth
            helperText={state?.error?.password && state?.error?.password}
          />
          <TextField
            required
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
          <TextField
            required
            error={state?.error?.location?.length !== undefined}
            id="location"
            name="location"
            label="location"
            fullWidth
            size="small"
            helperText={state?.error?.location && state?.error?.location}
          />
          <TextField
            required
            error={state?.error?.phoneNumber?.length !== undefined}
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            label="phone Number"
            fullWidth
            size="small"
            helperText={state?.error?.phoneNumber && state?.error?.phoneNumber}
          />

          <FormControl
            error={state?.error?.terms?.length != 0}
            sx={{ m: 1 }}
            variant="standard"
          >
            <FormControlLabel
              control={<Checkbox id="terms" name="terms" />}
              label="I accept the Terms and Conditions"
            />
            <FormHelperText>{state?.error?.terms}</FormHelperText>
          </FormControl>

          <FormControl
            error={state?.error?.role?.length != 0}
            sx={{ m: 1 }}
            variant="standard"
          >
            <FormControlLabel
              control={<Switch id="role" name="role" />}
              label="Are you a book owner?"
            />
            <FormHelperText>{state?.error?.role}</FormHelperText>
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
