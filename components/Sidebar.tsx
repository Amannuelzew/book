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
import { sidebardefineAbilityFor } from "@/utils/ability";
import { User } from "@prisma/client";
import { Can } from "@casl/react";
const links = [
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Other", icon: AddBoxOutlinedIcon },
  { path: "", name: "Notification", icon: NotificationsNoneOutlinedIcon },
  { path: "", name: "Setting", icon: SettingsOutlinedIcon },
  { path: "", name: "Login as Book Owner", icon: AccountCircleOutlinedIcon },
];
/*
delete me
 class books {
  constructor(title: string, authorId: string) {
    this.title = title;
    this.authorId = authorId;
  }
}
const aa = new books("one", "1ae225f0-0fad-4a40-a761-980d596bb17"); */
const Sidebar = ({ user }: { user: User }) => {
  const path = usePathname();
  const ability = sidebardefineAbilityFor(user);

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
      <Can I="read" a="/dashboard" ability={ability}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 1,
            gap: 2,
            alignItems: "end",
            backgroundColor: "/dashboard" == path ? "#02AAFF" : "",
            p: "/dashboard" == path ? 1 : 0,
            borderRadius: "/dashboard" == path ? "10px" : "0px",
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
      </Can>
      {/* Books admin */}
      <Can I="read" a="/books" ability={ability}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 1,
            gap: 2,
            alignItems: "end",
            backgroundColor: "/books" == path ? "#02AAFF" : "",
            p: "/books" == path ? 1 : 0,
            borderRadius: "/books" == path ? "10px" : "0px",
            "&:hover": {
              color: "/books" == path ? "" : "#02AAFF",
              cursor: "pointer",
            },
          }}
        >
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
        </Box>
      </Can>
      {/* Book owner */}
      <Can I="read" a="/book" ability={ability}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 1,
            gap: 2,
            alignItems: "end",
            backgroundColor: "/book" == path ? "#02AAFF" : "",
            p: "/book" == path ? 1 : 0,
            borderRadius: "/book" == path ? "10px" : "0px",
            "&:hover": {
              color: "/book" == path ? "" : "#02AAFF",
              cursor: "pointer",
            },
          }}
        >
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
        </Box>
      </Can>
      {/* Books user */}
      <Can I="read" a="/user/books" ability={ability}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 1,
            gap: 2,
            alignItems: "end",
            backgroundColor: "/user/books" == path ? "#02AAFF" : "",
            p: "/user/books" == path ? 1 : 0,
            borderRadius: "/user/books" == path ? "10px" : "0px",
            "&:hover": {
              color: "/user/books" == path ? "" : "#02AAFF",
              cursor: "pointer",
            },
          }}
        >
          <FilterNoneIcon sx={{ fontSize: 20 }} />
          <Link
            href={"/user/books"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "/user/books" == path ? "" : "#02AAFF",
                  cursor: "pointer",
                },
              }}
            >
              Books
            </Typography>
          </Link>
        </Box>
      </Can>
      {/* owners admin */}
      <Can I="read" a="/owners" ability={ability}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 1,
            gap: 2,
            alignItems: "end",
            backgroundColor: "/owners" == path ? "#02AAFF" : "",
            p: "/owners" == path ? 1 : 0,
            borderRadius: "/owners" == path ? "10px" : "0px",
            "&:hover": {
              color: "/owners" == path ? "" : "#02AAFF",
              cursor: "pointer",
            },
          }}
        >
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
        </Box>
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
                    marginBottom: 1,
                    gap: 2,
                    alignItems: "end",
                    backgroundColor: link.path == path ? "#02AAFF" : "",
                    p: link.path == path ? 1 : 0,
                    borderRadius: link.path == path ? "10px" : "0px",
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
                    backgroundColor: link.path == path ? "#02AAFF" : "",
                    p: link.path == path ? 1 : 0,
                    borderRadius: link.path == path ? "10px" : "0px",
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
