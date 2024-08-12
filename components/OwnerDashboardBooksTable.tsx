"use client";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
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
import {
  deleteBook,
  editBook,
  bookFilterByColumns,
  globalBookfilter,
} from "@/actions/owner";
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
type categoryProps = {
  id: string;
  name: string;
};
/* const categories = [
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
]; */
const OwnerDashboardBooksTable = ({
  books,
  categories,
}: {
  books: books[];
  categories: categoryProps[];
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [data, setData] = useState<books[]>(books);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const handleOpen = (id: string) => {
    setOpen(true);
    setCurrent(parseInt(id));
  };
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => {
    setAlertOpen((prev) => !prev);
  };
  const editBookWithId = editBook.bind(
    null,
    books.length ? books[current].id : ""
  );
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [pending, startTransition] = useTransition();

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const [state, action] = useFormState(editBookWithId, {
    error: null,
    message: null,
  });

  const handleDeletion = (id: string) => {
    setData(data.filter((_, i) => i !== current));
    startTransition(() => deleteBook(id));
    handleAlertClose();
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const newData: books = data[current];
    newData.title = (event.target as any).title.value;
    newData.author = (event.target as any).author.value;
    newData.quantity = (event.target as any).quantity.value;
    newData.price = (event.target as any).price.value;
    newData.categoryId = (event.target as any).category.value;
    setData(data.map((item, i) => (i == current ? newData : item)));
    //this will not ensure data update, its like optimistic update
    handleClose();
  };
  const currentPath = usePathname();

  useEffect(() => {
    setTitle(data.length ? data[current].title : "");
    setAuthor(data.length ? data[current].author : "");
    setQantity(data.length ? data[current].quantity.toString() : "");
    setPrice(data.length ? data[current].price.toString() : "");
    setCategory(data.length ? data[current].categoryId : "");
  }, [current]);

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
        accessorKey: "title",
        header: "Book Name",
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
            <DeleteIcon color="error" onClick={handleAlertClose} />
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
    manualFiltering: true,
    //initialState: { showColumnFilters: true },
    onGlobalFilterChange: handleSearch,
    onColumnFiltersChange: setColumnFilters,
    state: { globalFilter, columnFilters },
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

        <form action={action} onSubmit={(event) => handleSubmit(event)}>
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
        onClose={handleAlertClose}
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
          <Button variant="contained" onClick={handleAlertClose}>
            Disagree
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FA142B",
              "&:hover": {
                background: "red",
              },
            }}
            onClick={(e) => handleDeletion(data[current].id)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialReactTable table={table} />
    </>
  );
};

export default OwnerDashboardBooksTable;
