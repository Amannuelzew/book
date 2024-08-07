"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { Category } from "@prisma/client";
type dataProps = {
  label: string;
  value: number;
  color: string;
}[];
const data = [
  { value: 5, label: "Fiction" },
  { value: 10, label: "Self Help" },
  { value: 15, label: "Business" },
];

const size = {
  width: 320,
  height: 200,
};

export default function Pie({ data }: { data: dataProps }) {
  return (
    <PieChart
      series={[{ data, innerRadius: 70 }]}
      {...size}
      slotProps={{ legend: { hidden: true } }}
    ></PieChart>
  );
}
