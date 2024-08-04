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
import { defineAbilityFor } from "@/utils/ability";
import { User } from "@prisma/client";
import { Can } from "@casl/react";
const links = [
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Notification", icon: NotificationsNoneOutlinedIcon },
  { path: "", name: "Setting", icon: SettingsOutlinedIcon },
  { path: "", name: "Login as Book Owner", icon: AccountCircleOutlinedIcon },
];
const Sidebar = ({ user }: { user: User }) => {
  const path = usePathname();
  const ability = defineAbilityFor(user);
  console.log(ability.can("manage", "owners"), "ssss");
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
          alignItems: "end",
        }}
      >
        <MenuOutlinedIcon />
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            gap: 1,
            color: "skyblue",
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: 25 }} />
          <Typography fontSize={20}>Book Rent</Typography>
        </Box>
      </Box>
      {/*  {links
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
                  marginBottom: 1,
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
                <link.icon sx={{ fontSize: 20, }} />

                <Typography>{link.name}</Typography>
              </Box>
            </Link>
          );
        })
        .slice(0, 5)}
 */}
      {/* Dashboard */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 1,
          gap: 2,
          alignItems: "end",
          backgroundColor: "/dashboard" == path && "#02AAFF",
          p: "/dashboard" == path && 1,
          borderRadius: "/dashboard" == path && "10px",
          "&:hover": {
            color: "/dashboard" == path ? "" : "#02AAFF",
            cursor: "pointer",
          },
        }}
      >
        <SpaceDashboardOutlinedIcon sx={{ fontSize: 20 }} />
        <Link
          href={"/dashboard"}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "/dashboard" == path ? "" : "#02AAFF",
                cursor: "pointer",
              },
            }}
          >
            Dashboard
          </Typography>
        </Link>
      </Box>
      {/* Books admin */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 1,
          gap: 2,
          alignItems: "end",
          backgroundColor: "/books" == path && "#02AAFF",
          p: "/books" == path && 1,
          borderRadius: "/books" == path && "10px",
          "&:hover": {
            color: "/books" == path ? "" : "#02AAFF",
            cursor: "pointer",
          },
        }}
      >
        <Can I="read" an="books" ability={ability}>
          <FilterNoneIcon sx={{ fontSize: 20 }} />
          <Link
            href={"/books"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "/books" == path ? "" : "#02AAFF",
                  cursor: "pointer",
                },
              }}
            >
              Books
            </Typography>
          </Link>
        </Can>
      </Box>
      {/* Book owner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 1,
          gap: 2,
          alignItems: "end",
          backgroundColor: "/book" == path && "#02AAFF",
          p: "/book" == path && 1,
          borderRadius: "/book" == path && "10px",
          "&:hover": {
            color: "/book" == path ? "" : "#02AAFF",
            cursor: "pointer",
          },
        }}
      >
        <Can I="manage" a="book" ability={ability}>
          <FilterNoneIcon sx={{ fontSize: 20 }} />
          <Link
            href={"/book"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "/book" == path ? "" : "#02AAFF",
                  cursor: "pointer",
                },
              }}
            >
              Book Upload
            </Typography>
          </Link>
        </Can>
      </Box>
      {/* owners admin */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 1,
          gap: 2,
          alignItems: "end",
          backgroundColor: "/owners" == path && "#02AAFF",
          p: "/owners" == path && 1,
          borderRadius: "/owners" == path && "10px",
          "&:hover": {
            color: "/owners" == path ? "" : "#02AAFF",
            cursor: "pointer",
          },
        }}
      >
        <Can I="read" an="owners" ability={ability}>
          <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />

          <Link
            href={"/owners"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "/owners" == path ? "" : "#02AAFF",
                  cursor: "pointer",
                },
              }}
            >
              Owners
            </Typography>
          </Link>
        </Can>
      </Box>
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
                    marginBottom: 1,
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
                  <link.icon sx={{ fontSize: 20 }} />

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
                    marginBottom: 1,
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
                  <link.icon sx={{ fontSize: 20 }} />

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
