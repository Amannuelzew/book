"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
import { deleteBook, editBook } from "@/actions/owner";
import { useFormState } from "react-dom";
import Submit from "./Submit";
import { usePathname } from "next/navigation";
type books = {
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
const OwnerDashboardBooksTable = ({ data }: { data: books[] }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleClose = () => setOpen(false);
  const editBookWithId = editBook.bind(null, data[current].id);
  const [title, setTitle] = useState(data[current].title);
  const [author, setAuthor] = useState(data[current].author);
  const [quantity, setQantity] = useState(data[current].quantity.toString());
  const [price, setPrice] = useState(data[current].price.toString());
  const [category, setCategory] = useState("");
  const [pending, startTransition] = useTransition();
  const handleOpen = (id: string) => {
    setOpen(true);
    setCurrent(parseInt(id));
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const [state, action] = useFormState(editBookWithId, {
    error: null,
    message: null,
  });
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleDeletion = (id: string) => {
    startTransition(() => deleteBook(id));
    setAlertOpen(false);
  };
  const currentPath = usePathname();

  useEffect(() => {
    setTitle(data[current].title);
    setAuthor(data[current].author);
    setQantity(data[current].quantity.toString());
    setPrice(data[current].price.toString());
    setCategory(data[current].categoryId);
  }, [current]);
  const columns = useMemo<MRT_ColumnDef<books>[]>(
    () => [
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
            <EditIcon onClick={() => handleOpen(row.id)} />
            <DeleteIcon color="error" onClick={handleAlertOpen} />
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

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        sx={{ borderRadius: "5" }}
      >
        <DialogTitle>Edit a Book</DialogTitle>
        <form action={action}>
          <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              id="title"
              type="text"
              name="title"
              label="title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText={state?.error?.title && state?.error?.title}
              error={state?.error?.title?.length !== undefined}
            />
            <TextField
              id="author"
              type="text"
              name="author"
              label="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              helperText={state?.error?.author && state?.error?.author}
              error={state?.error?.author?.length !== undefined}
            />
            <TextField
              id="quantity"
              type="number"
              name="quantity"
              label="quantity"
              value={quantity}
              onChange={(e) => setQantity(e.target.value)}
              helperText={state?.error?.quantity && state?.error?.quantity}
              error={state?.error?.quantity?.length !== undefined}
            />
            <TextField
              id="price"
              type="number"
              name="price"
              label="price"
              value={price}
              fullWidth
              onChange={(e) => setPrice(e.target.value)}
              helperText={state?.error?.price && state?.error?.price}
              error={state?.error?.price?.length !== undefined}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                id="category"
                name="category"
                value={category}
                label="category"
                onChange={handleCategoryChange}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{state?.error?.category}</FormHelperText>
            </FormControl>
            <Typography>{state?.error?.category?.length != 0}</Typography>
            <input type="hidden" name="currentPath" value={currentPath} />
            <Submit label="Submit" />
          </Box>
        </form>
      </Dialog>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you absolutely sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can&#39;t be undone. This will permanently delete your
            book
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Disagree</Button>
          <Button onClick={(e) => handleDeletion(data[current].id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialReactTable table={table} />
    </>
  );
};

export default OwnerDashboardBooksTable;
