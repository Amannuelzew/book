"use client";
import { Box, Button, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signout } from "@/actions/signout";
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
  const path = usePathname();
  return (
    <Box
      sx={{
        backgroundColor: "#171B36",
        p: 2,
        color: "white",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 7,
          gap: 3,
          alignItems: "end",
        }}
      >
        <MenuOutlinedIcon />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            textAlign: "end",
            gap: 3,
            color: "skyblue",
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">Book Rent</Typography>
        </Box>
      </Box>
      {links
        .map((link, i) => {
          return (
            <Link
              href={link.path}
              key={i}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 2,
                  gap: 2,
                  alignItems: "end",
                  backgroundColor: link.path == path && "#02AAFF",
                  p: link.path == path && 1,
                  borderRadius: link.path == path && "10px",
                  "&:hover": {
                    color: link.path == path ? "" : "#02AAFF",
                    cursor: "pointer",
                  },
                }}
              >
                <link.icon sx={{ fontSize: 30 }} />

                <Typography>{link.name}</Typography>
              </Box>
            </Link>
          );
        })
        .slice(0, 5)}

      <Box
        sx={{
          my: 7,
        }}
      >
        {links
          .map((link, i) => {
            return (
              <Link
                href={link.path}
                key={i}
                style={{ color: "white", textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 2,
                    gap: 2,
                    alignItems: "end",
                    backgroundColor: link.path == path && "#02AAFF",
                    p: link.path == path && 1,
                    borderRadius: link.path == path && "10px",
                    "&:hover": {
                      color: link.path == path ? "" : "#02AAFF",
                      cursor: "pointer",
                    },
                  }}
                >
                  <link.icon sx={{ fontSize: 30 }} />

                  <Typography>{link.name}</Typography>
                </Box>
              </Link>
            );
          })
          .slice(5)}
      </Box>
      <Button
        variant="contained"
        fullWidth
        startIcon={<LogoutIcon />}
        sx={{ backgroundColor: "gray" }}
        onClick={() => signout()}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AdminSidebar;
