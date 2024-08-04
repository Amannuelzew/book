import AdminSidebar from "@/components/AdminSidebar";
import { Box, Grid } from "@mui/material";

const OwnerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box sx={{ backgroundColor: "#BBE0FF" }}>
      <Grid container>
        <Grid item sm={2}>
          <AdminSidebar />
        </Grid>
        <Grid item sm={10}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OwnerLayout;
