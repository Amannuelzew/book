"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import GreenSwitch from "@/components/GreenSwitch";
import { Box, Button, FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
type owners = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  approved: boolean;
  disabled: boolean;
  userId: string;
  _count: {
    user: number;
    books: number;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    location: string;
    phoneNumber: string;
    image: string;
    role: string;
    wallet: number;
  } | null;
};
const Table = ({ data }: { data: owners[] }) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<owners>[]>(
    () => [
      {
        accessorKey: "user.email",
        header: "owner",
        //Format a number in a cell render
        Cell: ({ cell }) => (
          <span>{cell.getValue<string>().split("@")[0]}</span>
        ),
        size: 150,
      },
      {
        accessorKey: "_count.books",
        header: "Upload",
        size: 150,
        Cell: ({ cell }) => <span>{cell.getValue<string>()} Books</span>,
      },
      {
        accessorKey: "user.location",
        header: "Location",
        size: 150,
      },

      {
        accessorKey: "disabled",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <GreenSwitch
            checked={cell ? true : false}
            onChange={(e) => alert(e.target.checked)}
            //inputProps={{ "aria-label": "controlled" }}
          />
        ),
      },
      //need two icons view delete
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        enableSorting: false, //disable sorting on this column
        enableColumnFilter: false,

        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <VisibilityIcon />
            <DeleteIcon color="error" />
          </Box>
        ),
      },
      {
        accessorKey: "approved",
        header: "Approved",
        size: 150,
        enableSorting: false, //disable sorting on this column
        enableColumnFilter: false,
        Header: ({ column }) => <></>,
        Cell: ({ cell }) => (
          <>
            {cell ? (
              <Button variant="contained">Approve</Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "gray",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                Approved
              </Button>
            )}
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
