"use client";
import { Box, Button, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signout } from "@/actions/signout";
import { routedefineAbilityFor } from "@/utils/ability";
import { User } from "@prisma/client";
import { Can } from "@casl/react";
const links = [
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Notification", icon: NotificationsNoneOutlinedIcon },
  { path: "", name: "Setting", icon: SettingsOutlinedIcon },
  { path: "", name: "Login as Owner", icon: AccountCircleOutlinedIcon },
];

const Sidebar = ({ user }: { user: User }) => {
  const path = usePathname();
  const ability = routedefineAbilityFor(user);

  return (
    <Box
      position={"relative"}
      sx={{
        backgroundColor: "#171B36",
        p: 2,
        my: 1,
        color: "white",
        borderRadius: "10px",
        height: "933px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 7,
          gap: 3,
          alignItems: "center",
        }}
      >
        <MenuOutlinedIcon />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "skyblue",
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: 25 }} />
          <Typography fontSize={20}>Book Rent</Typography>
        </Box>
      </Box>

      {/* Dashboard */}
      <Can I="read" a="/dashboard" ability={ability}>
        <Link
          href={"/dashboard"}
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              gap: 2,
              alignItems: "center",
              backgroundColor: "/dashboard" == path ? "#02AAFF" : "",
              p: "/dashboard" == path ? 1 : 0,
              borderRadius: "/dashboard" == path ? "10px" : "0px",
              "&:hover": {
                color: "/dashboard" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            <SpaceDashboardOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography>Dashboard</Typography>
          </Box>
        </Link>
      </Can>
      {/* list of books */}
      <Can I="read" a="/books" ability={ability}>
        <Link
          href={"/books"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              gap: 2,
              alignItems: "center",
              backgroundColor: "/books" == path ? "#02AAFF" : "",
              p: "/books" == path ? 1 : 0,
              borderRadius: "/books" == path ? "10px" : "0px",
              "&:hover": {
                color: "/books" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            <FilterNoneIcon sx={{ fontSize: 30 }} />
            <Typography>Books</Typography>
          </Box>
        </Link>
      </Can>
      {/* upload book */}
      <Can I="read" a="/upload" ability={ability}>
        <Link
          href={"/upload"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              gap: 2,
              alignItems: "center",
              backgroundColor: "/upload" == path ? "#02AAFF" : "",
              p: "/upload" == path ? 1 : 0,
              borderRadius: "/upload" == path ? "10px" : "0px",
              "&:hover": {
                color: "/upload" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            <FilterNoneIcon sx={{ fontSize: 30 }} />
            <Typography>Book Upload</Typography>
          </Box>
        </Link>
      </Can>
      {/*edit meeee lsit of Books */}
      <Can I="read" a="/user/rent" ability={ability}>
        <Link
          href={"/user/rent"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              gap: 2,
              alignItems: "center",
              backgroundColor: "/user/rent" == path ? "#02AAFF" : "",
              p: "/user/rent" == path ? 1 : 0,
              borderRadius: "/user/rent" == path ? "10px" : "0px",
              "&:hover": {
                color: "/user/rent" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            <FilterNoneIcon sx={{ fontSize: 30 }} />
            <Typography>Rents</Typography>
          </Box>
        </Link>
      </Can>
      {/* list of owners  */}
      <Can I="read" a="/owners" ability={ability}>
        <Link
          href={"/owners"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              gap: 2,
              alignItems: "center",
              backgroundColor: "/owners" == path ? "#02AAFF" : "",
              p: "/owners" == path ? 1 : 0,
              borderRadius: "/owners" == path ? "10px" : "0px",
              "&:hover": {
                color: "/owners" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography>Owners</Typography>
          </Box>
        </Link>
      </Can>
      {/* others */}
      <Box>
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
                    alignItems: "center",
                    backgroundColor: link.path == path ? "#02AAFF" : "",
                    p: link.path == path ? 1 : 0,
                    borderRadius: link.path == path ? "10px" : "0px",
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
          .slice(0, 2)}
      </Box>
      {/* last three */}
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
                    alignItems: "center",
                    backgroundColor: link.path == path ? "#02AAFF" : "",
                    p: link.path == path ? 1 : 0,
                    borderRadius: link.path == path ? "10px" : "0px",
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
          .slice(2)}
      </Box>

      <Box position={"absolute"} bottom={10} width={"80%"}>
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
    </Box>
  );
};

export default Sidebar;
