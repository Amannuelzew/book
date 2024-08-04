import AdminSidebar from "@/components/AdminSidebar";
import { Box, Grid } from "@mui/material";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box>
      <Grid container>
        <Grid sm={2.2}>
          <AdminSidebar />
        </Grid>

        <Grid sm={9.8}>{children}</Grid>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
