import Signin from "@/components/Signin";
import { Box, Grid } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const Signinpage = () => {
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
          <Signin />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signinpage;
