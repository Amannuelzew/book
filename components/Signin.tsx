"use client";
import Submit from "./Submit";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signinUser } from "@/actions/auth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
const Signin = () => {
  const [state, action] = useFormState(signinUser, {
    error: null,
    message: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ paddingX: 10, paddingY: 15 }}>
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h6">Login into Book Rent</Typography>
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
            helperText={state?.error?.email && state?.error?.email}
          />
          <TextField
            required
            error={state?.error?.password?.length !== undefined}
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            label="password"
            size="medium"
            fullWidth
            helperText={state?.error?.password && state?.error?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            required
            error={state?.error?.remember?.length != 0}
            sx={{ m: 1 }}
            variant="standard"
          >
            <FormControlLabel
              control={<Checkbox id="remember" name="remember" />}
              label="Remember me"
            />
            <FormHelperText>{state?.error?.remember}</FormHelperText>
          </FormControl>
          <Typography sx={{ color: "red", fontsize: "12.33px" }} align="center">
            {state?.message}
          </Typography>
          <Submit label="LOGIN" />
          <Typography align="center" sx={{ m: 2 }}>
            Have not an account? <Link href="/signup">Sign up</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Signin;
