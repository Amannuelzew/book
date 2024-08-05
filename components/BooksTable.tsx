"use client";
import { useMemo, useTransition } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button } from "@mui/material";
import { approveBook } from "@/utils/admin";

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
    approved: boolean;
    disabled: boolean;
    userId: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  title: string;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const BooksTable = ({ data }: { data: books[] }) => {
  const [pending, startTransition] = useTransition();
  const handleApprove = (id: string) => {
    startTransition(() => approveBook(id));
  };
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<books>[]>(
    () => [
      {
        accessorKey: "author",
        header: "Author",
        size: 150,
      },
      {
        accessorKey: "owner.name",
        header: "owner",
        size: 150,
      },
      {
        accessorKey: "category.name",
        header: "Category",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Book Name",
        size: 150,
      },
      {
        accessorKey: "approved",
        header: "Approved",
        size: 150,
        enableSorting: false, //disable sorting on this column
        enableColumnFilter: false,
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

export default BooksTable;
