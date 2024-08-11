"use client";

import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
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
const UserShow = () => {
  const [data, setData] = useState<books[] | []>([]);

  useEffect(() => {
    const getbooks = async () => {
      const res = await fetch("http://localhost:3000/api/books").then((res) =>
        res.json()
      );
      setData(res.data);
    };
    getbooks();
  }, []);
  const columns = useMemo<MRT_ColumnDef<books>[] | []>(
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
        accessorKey: "owner.name",
        header: "Owner",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
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
    data,
    enableRowNumbers: true,
  });

  return <MaterialReactTable table={table} />;
};

export default UserShow;
