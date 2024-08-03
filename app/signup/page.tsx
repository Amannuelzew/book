import Signup from "@/components/Signup";
import { Box, Grid } from "@mui/material";
const Signuppage = () => {
  return (
    <Box>
      <Grid container>
        <Grid sm={6}>
          <Box sx={{ backgroundColor: "gray", height: "100vh" }}>dsa</Box>
        </Grid>
        <Grid sm={6}>
          <Signup />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signuppage;
