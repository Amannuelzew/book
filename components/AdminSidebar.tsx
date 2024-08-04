"use client";
import { Box, Grid, Menu, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const links = [
  { path: "/admin", name: "Dashboard", icon: SpaceDashboardOutlinedIcon },
  { path: "/admin/books", name: "Books", icon: LibraryBooksOutlinedIcon },
  { path: "/admin/owners", name: "Owners", icon: PersonOutlineOutlinedIcon },
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Notification", icon: NotificationsNoneOutlinedIcon },
  { path: "", name: "Setting", icon: SettingsOutlinedIcon },
  { path: "", name: "Login as Book Owner", icon: AccountCircleOutlinedIcon },
];
const AdminSidebar = () => {
  return (
    <Box sx={{ backgroundColor: "#171B36" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          gap: 3,
          alignItems: "end",
        }}
      >
        <Menu open />
        <Box sx={{ color: "blue" }}>
          <AutoStoriesIcon sx={{ fontSize: 40 }} />
          <Typography variant="h5">Book Rent</Typography>
        </Box>
      </Box>
      {links
        .map((link, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
                gap: 3,
                alignItems: "end",
              }}
            >
              <link.icon />
              <Typography>{link.name}</Typography>
            </Box>
          );
        })
        .slice(0, 5)}
    </Box>
  );
};

export default AdminSidebar;
