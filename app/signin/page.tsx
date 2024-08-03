import Signin from "@/components/Signin";
import { Box, Grid } from "@mui/material";

const Signinpage = () => {
  return (
    <Box className="grid grid-cols-2 h-screen">
      <Grid container spacing={2}>
        <Box sx={{ backgroundColor: "gray" }}></Box>
        <Signin />
      </Grid>
    </Box>
  );
};

export default Signinpage;
