"use client";
import { useMemo, useTransition } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import GreenSwitch from "@/components/GreenSwitch";
import { Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { approveOwner } from "@/utils/admin";
type owners = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  location: string;
  approved: boolean;
  disabled: boolean;
  userId: string;
  _count: {
    user: number;
    books: number;
  };
};
const OwnersTable = ({ data }: { data: owners[] }) => {
  const [pending, startTransition] = useTransition();
  const handleApprove = (id: string) => {
    startTransition(() => approveOwner(id));
  };
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<owners>[]>(
    () => [
      {
        accessorKey: "name",
        header: "owner",
        size: 150,
      },
      {
        accessorKey: "_count.books",
        header: "Upload",
        size: 150,
        Cell: ({ cell }) => <span>{cell.getValue<string>()} Books</span>,
      },
      {
        accessorKey: "location",
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
        enableColumnActions: false,
        Header: ({ column }) => <></>,
        Cell: ({ cell, row }) => (
          <>
            {row.original.approved ? (
              <Button
                variant="contained"
                onClick={() => handleApprove(row.original.id)}
                sx={{
                  backgroundColor: "gray",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                Approved
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleApprove(row.original.id)}
              >
                Approve
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

export default OwnersTable;
