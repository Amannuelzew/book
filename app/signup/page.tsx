import Signup from "@/components/Signup";
import { Box, Grid } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const Signuppage = () => {
  return (
    <Box>
      <Grid container>
        <Grid sm={6}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#171B36",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoStoriesIcon sx={{ color: "white", fontSize: 300 }} />
          </Box>
        </Grid>
        <Grid sm={6}>
          <Signup />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signuppage;
