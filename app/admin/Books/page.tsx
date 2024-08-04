import { Box, Grid } from "@mui/material";

const AdminBookspage = () => {
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
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminBookspage;
