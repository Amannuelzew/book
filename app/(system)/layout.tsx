import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/utils/user";
import { Box, Grid } from "@mui/material";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();
  return (
    <Box sx={{ backgroundColor: "#BBE0FF" }}>
      <Grid container>
        <Grid item sm={2}>
          <Sidebar user={user!} />
        </Grid>
        <Grid item sm={10}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
