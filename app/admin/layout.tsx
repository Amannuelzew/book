import AdminSidebar from "@/components/AdminSidebar";
import { Box } from "@mui/material";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box>
      <AdminSidebar />
      {children}
    </Box>
  );
};

export default AdminLayout;
