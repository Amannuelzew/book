"use client";
import { useMemo, useState, useTransition } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import GreenSwitch from "@/components/GreenSwitch";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { approveOwner, disableOwner } from "@/utils/admin";
type owners = {
  user: {
    email: string;
    phoneNumber: string;
  };
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
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const handleOpen = (id: string) => {
    setOpen(true);
    setCurrent(parseInt(id));
  };
  const handleClose = () => setOpen(false);
  const [pending, startTransition] = useTransition();
  const handleApprove = (id: string) => {
    startTransition(() => approveOwner(id));
  };
  const handleDisable = (id: string) => {
    startTransition(() => disableOwner(id));
  };

  const columns = useMemo<MRT_ColumnDef<owners>[]>(
    () => [
      {
        accessorKey: "name",
        header: "owner",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "_count.books",
        header: "Upload",
        size: 150,
        Cell: ({ cell }) => <span>{cell.getValue<string>()} Books</span>,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "disabled",
        header: "Status",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell, row }) => (
          <GreenSwitch
            checked={row.original.disabled ? false : true}
            onChange={() => handleDisable(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Box sx={{ display: "flex", gap: 2, cursor: "pointer" }}>
              <VisibilityIcon onClick={() => handleOpen(row.id)} />
              <DeleteIcon color="error" />
            </Box>
            <div></div>
          </Box>
        ),
      },
      {
        accessorKey: "approved",
        header: "Approved",
        size: 150,
        enableSorting: false,
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
    data,
    enableRowNumbers: true,
    enableGlobalFilter: false,
    enableColumnFilters: false,
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        sx={{ borderRadius: "5" }}
      >
        <DialogTitle>preview owners</DialogTitle>
        <Box
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            value={data.length ? data[current].name : ""}
            label="Name"
            disabled
            fullWidth
          />
          <TextField
            value={data.length ? data[current].user.email : ""}
            label="Email"
            disabled
            fullWidth
          />
          <TextField
            value={data.length ? data[current].location : ""}
            label="Location"
            disabled
            fullWidth
          />
          <TextField
            value={data.length ? data[current].user.phoneNumber : ""}
            label="Phone Number"
            disabled
            fullWidth
          />
        </Box>
      </Dialog>
    </>
  );
};

export default OwnersTable;
