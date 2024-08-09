"use client";

import { formatDate } from "@/utils/formatters";
import { Typography } from "@mui/material";

const DateComponent = () => {
  return <Typography fontSize={13}>{formatDate(new Date())}</Typography>;
};

export default DateComponent;
