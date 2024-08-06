"use client";
import { useEffect, useMemo, useState, useTransition } from "react";

import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button } from "@mui/material";
import {
  approveBook,
  bookFilterByColumns,
  globalBookfilter,
} from "@/utils/admin";
import { revalidatePath } from "next/cache";

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
  approved: boolean;
  quantity: number;
  price: number;
  url: string;
  categoryId: string;
  ownerId: string;
};
const BooksTable = ({ books }: { books: books[] }) => {
  const [pending, startTransition] = useTransition();
  const [globalFilter, setGlobalFilter] = useState("");
  const [approve, setApprove] = useState<{ id: string; value: boolean }>();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [data, setData] = useState<books[]>(books);

  const handleApprove = (id: string, rowId: string, value: boolean) => {
    startTransition(() => approveBook(id));

    //setData(data.filter((dd) => dd.id === id));
    console.log(
      data.map((dd) => (dd.id === id ? { ...dd, approved: value } : dd))
    );
    //setData(data.map((dd) => (dd.id === id ? { ...dd, approved: value } : dd)));
  };

  /* const handleApprove = async (id: string, rowId: string) => {
    const data = await fetch("http://localhost:300/api/books", {
      method: "PATCh",
      body: JSON.stringify({ id: id }),
    }).then((data) => data.json());
  }; */
  //get all available books
  /* useEffect(() => {
    const fetchData = async () => {
      if (process.env.NODE_ENV == "development") {
        const data = await fetch("http://localhost:3000/api/books").then(
          (res) => res.json()
        );
        setData(data);
      }
    };
    fetchData();
  }, []); */
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

export default BooksTable;
