import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/utils/user";
import { Box, Grid } from "@mui/material";

export const metadata: Metadata = {
  title: "Book Rent",
  description: "Discover Your Next Adventures With Our Book Rentals!",
};
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
