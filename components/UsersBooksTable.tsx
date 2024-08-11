"use client";
import { useMemo, useTransition } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { rentBook } from "@/actions/user";

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
const categories = [
  {
    id: "633d7516-30e6-404a-b24b-55261239c348",
    name: "Self Help",
  },
  {
    id: "bcc7ef79-89e9-4be2-bc9e-f04289707842",
    name: "Business",
  },
  {
    id: "e249fd39-702e-403c-ab53-addcf1268395",
    name: "Fiction",
  },
];
const UsersBooksTable = ({
  data,
  userId,
}: {
  data: books[];
  userId: string;
}) => {
  const [pending, startTransition] = useTransition();
  const handleRent = (id: string, ownerId: string, userId: string) => {
    startTransition(() => rentBook(id, ownerId, userId));
  };
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
      {
        accessorKey: "Rent",
        header: "Rent",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        Cell: ({ cell, row }) => (
          <Button
            variant="contained"
            onClick={() =>
              handleRent(row.original.id, row.original.owner.id, userId)
            }
          >
            Rent
          </Button>
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

export default UsersBooksTable;
