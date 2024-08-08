"use client";
import { useMemo } from "react";

import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
type books = {
  category: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
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
  available: boolean;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const OwnersBooksTable = ({ data }: { data: books[] }) => {
  const columns = useMemo<MRT_ColumnDef<books>[]>(
    () => [
      {
        accessorKey: "author",
        header: "Author",
        size: 150,
        enableSorting: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "category.name",
        header: "Category",
        size: 150,
        enableSorting: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "title",
        header: "Book Name",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "available",
        header: "status",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell, row }) => (
          <Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: cell ? "#49CA3A" : "red",
                    width: 15,
                    height: 15,
                    borderRadius: 30,
                    border: 1,
                    borderColor: cell ? "#49CAEE" : "red",
                  }}
                ></Box>
                <Typography>{cell ? "Available" : "Rented"}</Typography>
              </Box>
            </Box>
            <div></div>
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell }) => <span>{cell.getValue<string>()} Birr</span>,
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ cell, row }) => (
          <Box sx={{ display: "flex", gap: 2, cursor: "pointer" }}>
            <VisibilityIcon />
            <DeleteIcon color="error" />
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowNumbers: true,
  });

  return <MaterialReactTable table={table} />;
};

export default OwnersBooksTable;
