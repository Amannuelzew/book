"use client";
import { defineAbilityFor, routedefineAbilityFor } from "@/utils/ability";
import { Box, Card, Grid, Typography } from "@mui/material";
import { User, Category } from "@prisma/client";
import { redirect } from "next/navigation";
import Graph from "./Graph";
import Pie from "./Pie";
import { formatDate } from "@/utils/formatters";
import AdminDashboardBooksTable from "./AdminDashboardBooksTable";
import OwnerDashboardBooksTable from "./OwnerDashboardBooksTable";
type dataProps = {
  label: string;
  value: number;
  color: string;
}[];
type booksProps = {
  owner: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    location: string;
    approved: boolean;
    disabled: boolean;
    userId: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  title: string;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const Dashboard = ({
  user,
  data,
  revenue,
  books,
}: {
  user: User;
  data: dataProps;
  revenue: number;
  books: booksProps[];
}) => {
  //based on access control defined users of type role[ADMIN,OWNER] can only visit this page
  const ability = routedefineAbilityFor(user);
  const ablities = defineAbilityFor(user);

  return (
    <>
      {ability.can("read", "/dashboard") ? (
        <Grid container direction={"row"} alignItems={"stretch"} sx={{ p: 1 }}>
          {/* first row */}
          <Grid
            sm={12}
            item
            sx={{ p: 2, borderRadius: "10px", backgroundColor: "white" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontSize={20} fontWeight={"bold"}>
                {ablities.can("create", "Category") ? "Admin" : "Owner"}
              </Typography>
              <Typography>/Dashboard</Typography>
            </Box>
          </Grid>
          {/* second row */}
          <Grid item container sm={12} sx={{ my: 1, gap: 0.4 }}>
            {/* first col */}
            <Grid
              item
              sm={3}
              sx={{
                my: 1,
                p: 2,
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <Typography sx={{ mt: 1 }} fontSize={16} fontWeight={600}>
                This Month Statistics
              </Typography>
              <Typography fontSize={13}>{formatDate(new Date())}</Typography>
              {/* revenue card */}
              <Card sx={{ p: 2, my: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Income</Typography>
                  <Typography>This Month</Typography>
                </Box>
                <hr />
                <Typography fontSize={30} fontWeight={"bold"} sx={{ my: 2 }}>
                  ETB {revenue.toFixed(2)}
                  <sub style={{ color: "red", fontSize: "15px" }}>1.5%</sub>
                </Typography>
                <Typography fontSize={13}>
                  Compared to ETB70.00 last month
                </Typography>
                <Typography sx={{ mt: 1 }} fontSize={13} fontWeight={600}>
                  Last Month Income ETB 24532.00
                </Typography>
              </Card>
              {/* pie card */}
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Typography>Available Books</Typography>
                  <Typography>Today</Typography>
                </Box>

                <Box>
                  <Pie data={data} />
                </Box>
                {/* pie legend */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  <Box sx={{ width: 1 }}>
                    {data.map((d, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: d.color,
                                width: 20,
                                height: 20,
                                borderRadius: 30,
                              }}
                            ></Box>
                            <Typography fontSize={16}>{d.label}</Typography>
                          </Box>
                          <Typography fontSize={16}>{d.value}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/* second col */}
            <Grid
              item
              container
              direction={"row"}
              sm={8.9}
              sx={{
                my: 1,
                p: 3,
                borderRadius: "10px",
                backgroundColor: "white",
                gap: 5,
              }}
            >
              {/* table row */}
              <Grid sm={12}>
                <Typography fontSize={20} fontWeight={"bold"}>
                  Live Book Status
                </Typography>
                {ablities.can("create", "Category") ? (
                  <AdminDashboardBooksTable data={books} />
                ) : (
                  <OwnerDashboardBooksTable data={books} />
                )}
              </Grid>
              {/* graph row */}
              <Grid sm={12}>
                <Card sx={{ p: 3 }}>{/* <Graph /> */}</Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        redirect("/user/books")
      )}
    </>
  );
};

export default Dashboard;
