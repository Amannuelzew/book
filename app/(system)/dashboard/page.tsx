import Pie from "@/components/Pie";
import Table from "@/components/Table";
import Graph from "@/components/Graph";
import { formatDate } from "@/utils/formatters";
import { Box, Card, Grid, Typography } from "@mui/material";

const Dashbordpage = () => {
  return (
    <Grid container direction={"row"} alignItems={"stretch"} sx={{ p: 1 }}>
      {/*  <Grid
        sm={12}
        item
        sx={{ p: 2, borderRadius: "10px", backgroundColor: "white" }}
      >
        <Box display={"inline"} fontWeight="bold">
          Admin
        </Box>
        <Box display={"inline"}>/Dashboard</Box>
      </Grid>
      <Grid item container sm={12} sx={{ my: 1, gap: 0.4 }}>
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
          <Card>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Typography>Available Books</Typography>
              <Typography>Today</Typography>
            </Box>

            <Box>
              <Pie />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: "blue",
                      width: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    }}
                  ></Box>
                  <Typography>Fiction</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: "blue",
                      width: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    }}
                  ></Box>
                  <Typography>Self Help</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: "red",
                      width: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    }}
                  ></Box>
                  <Typography>Business</Typography>
                </Box>
              </Box>
              <Box>
                <Typography>54</Typography>
                <Typography>33</Typography>
                <Typography>11</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
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
          <Grid sm={12}>
            <Typography fontSize={20} fontWeight={"bold"}>
              Live Book Status
            </Typography>
            <Table />
          </Grid>
          <Grid sm={12}>
            <Card sx={{ p: 3 }}>
              <Graph />
            </Card>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashbordpage;
