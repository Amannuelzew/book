import Pie from "@/components/Pie";
import Table from "@/components/Table";
import Graph from "@/components/Graph";
import { formatDate } from "@/utils/formatters";
import { Box, Card, Grid, Typography } from "@mui/material";
import { getCurrentUser } from "@/utils/user";
import Dashboard from "@/components/Dashboard";

const Dashbordpage = async () => {
  const user = await getCurrentUser();

  return <Dashboard user={user!} />;
};

export default Dashbordpage;
