import { Box, Grid, Typography } from "@mui/material";
import Table from "@/components/Table";
const AdminOwnerspage = () => {
  return (
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
  );
};

export default AdminOwnerspage;
