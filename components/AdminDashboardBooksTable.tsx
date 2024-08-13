"use client";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import { bookFilterByColumns, globalBookfilter } from "@/utils/admin";
import Image from "next/image";
type books = {
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
  available: boolean;
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const AdminDashboardBooksTable = ({ books }: { books: books[] }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [data, setData] = useState<books[]>(books);
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
        accessorKey: "title",
        header: "Title",
        size: 150,
        enableSorting: false,
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
                    backgroundColor: row.original.available ? "#49CA3A" : "red",
                    width: 15,
                    height: 15,
                    borderRadius: 30,
                    border: 1,
                    borderColor: row.original.available ? "#49CAEE" : "red",
                  }}
                ></Box>
                <Typography>
                  {row.original.available ? "Available" : "Rented"}
                </Typography>
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    manualFiltering: true,
    onGlobalFilterChange: handleSearch,
    onColumnFiltersChange: setColumnFilters,
    state: { globalFilter, columnFilters },
  });

  return <MaterialReactTable table={table} />;
};

export default AdminDashboardBooksTable;
