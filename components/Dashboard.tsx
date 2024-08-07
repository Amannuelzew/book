"use client";
import { routedefineAbilityFor } from "@/utils/ability";
import { Box, Card, Grid, Typography } from "@mui/material";
import { User, Category } from "@prisma/client";
import { redirect } from "next/navigation";
import Graph from "./Graph";
import Pie from "./Pie";
import { formatDate } from "@/utils/formatters";
type dataProps = {
  label: string;
  value: number;
  color: string;
}[];
const Dashboard = ({ user, data }: { user: User; data: dataProps }) => {
  //based on access control defined users of type role[ADMIN,OWNER] can only visit this page
  const ability = routedefineAbilityFor(user);

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
            <Box display={"inline"} fontWeight="bold">
              Admin
            </Box>
            <Box display={"inline"}>/Dashboard</Box>
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
              <Typography>This Month Statistics</Typography>
              <Typography>{formatDate(new Date())}</Typography>
              {/* revenue card */}
              <Card sx={{ p: 2, my: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Income</Typography>
                  <Typography>This Month</Typography>
                </Box>
                <hr />
                <Typography fontSize={30} fontWeight={"bold"} sx={{ my: 2 }}>
                  ETB 940.00
                  <sub style={{ color: "red", fontSize: "15px" }}>1.5%</sub>
                </Typography>
                <Typography>Compared to ETB70.00 last month</Typography>
                <Typography>Last Month Income ETB 24532.00</Typography>
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
                              alignContent: "center",
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
                {/* <Table /> */}
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
