"use client";
import { useEffect, useMemo, useState, useTransition } from "react";

import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import {
  approveBook,
  bookFilterByColumns,
  globalBookfilter,
} from "@/utils/admin";
import { revalidatePath } from "next/cache";
import Image from "next/image";

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
    image: string;
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
const AdminBooksTable = ({ books }: { books: books[] }) => {
  const [pending, startTransition] = useTransition();
  const [globalFilter, setGlobalFilter] = useState("");
  const [approve, setApprove] = useState<{ id: string; value: boolean }>();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [data, setData] = useState<books[]>(books);

  const handleApprove = (id: string, rowId: string, value: boolean) => {
    startTransition(() => approveBook(id));
    setData((prev) =>
      prev.map((dd) => (dd.id === id ? { ...dd, approved: value } : dd))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(await globalBookfilter(globalFilter));

      if (columnFilters.length)
        setData(
          await bookFilterByColumns(
            columnFilters as [
              {
                id: string;
                value: string;
              }
            ]
          )
        );
    };
    fetchData();
  }, [globalFilter, columnFilters]);
  function handleSearch(term: string) {
    setGlobalFilter(term === undefined ? "" : term);
  }

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
        accessorKey: "owner.name",
        header: "owner",
        size: 150,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell, row }) => (
          <>
            {/* https://unsplash.com/photos/a-woman-sitting-on-a-tennis-court-holding-a-can-PGuGUh1oOq4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash */}
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <Image
                src={row.original.owner.image}
                alt="profile"
                width={30}
                height={30}
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                }}
              />
              <Typography>{row.original.owner.name}</Typography>
            </Box>
          </>
        ),
      },
      {
        accessorKey: "owner.location",
        header: "owner's location",
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
                onClick={() => handleApprove(row.original.id, row.id, false)}
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
                onClick={() => handleApprove(row.original.id, row.id, true)}
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
    manualFiltering: true,
    //initialState: { showColumnFilters: true },
    onGlobalFilterChange: handleSearch,
    onColumnFiltersChange: setColumnFilters,
    state: { globalFilter, columnFilters },
  });

  return <MaterialReactTable table={table} />;
};

export default AdminBooksTable;
