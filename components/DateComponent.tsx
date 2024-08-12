"use client";

import { formatDate } from "@/utils/formatters";
import { Typography } from "@mui/material";

const DateComponent = () => {
  return (
    <p style={{ fontSize: "13px" }} suppressHydrationWarning>
      {formatDate(new Date())}
    </p>
  );
};

export default DateComponent;
