"use client";
import Submit from "./Submit";
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import { uploadBook } from "@/actions/owner";
type categories = {
  name: string;
  id: string;
}[];

const UploadForm = ({ categories }: { categories: categories }) => {
  const [state, action] = useFormState(uploadBook, {
    error: null,
    message: null,
  });
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files.length > 0) setFile(event.target.files[0].name);
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ paddingX: 10, paddingY: 5, width: "60%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 2,
            gap: 3,
            alignItems: "end",
          }}
        >
          <Box>
            <AutoStoriesIcon sx={{ color: "#02AAFF", fontSize: 40 }} />
          </Box>
          <Typography variant="h5">Upload Book</Typography>
        </Box>
        <Box sx={{ my: 1 }}>
          <Typography fontSize={12}>
            *please note that all fields are required
          </Typography>
        </Box>
        <form action={action}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              id="title"
              type="text"
              name="title"
              label="title"
              fullWidth
              helperText={state?.error?.title && state?.error?.title}
              error={state?.error?.title?.length !== undefined}
            />
            <TextField
              id="author"
              type="text"
              name="author"
              label="author"
              fullWidth
              helperText={state?.error?.author && state?.error?.author}
              error={state?.error?.author?.length !== undefined}
            />
            <TextField
              id="quantity"
              type="number"
              name="quantity"
              label="quantity"
              helperText={state?.error?.quantity && state?.error?.quantity}
              error={state?.error?.quantity?.length !== undefined}
            />
            <TextField
              id="price"
              type="number"
              name="price"
              label="price"
              fullWidth
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
                onChange={handleChange}
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
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                accept="application/pdf"
                name="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Submit label="Submit" />
            <Typography sx={{ fontSize: "12" }}>
              {file ? `(${file})` : ""}
            </Typography>
            <Typography sx={{ color: "red", fontSize: "12" }}>
              {state?.error?.file && state?.error?.file}
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UploadForm;
