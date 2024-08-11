"use client";

import { Box, Typography } from "@mui/material";

type rentals = {
  id: string;
  rentedAt: Date;
  userId: string;
  books: {
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
  }[];
};

const UsersRentsTable = ({ data }: { data: rentals[] }) => {
  return (
    <Box>
      {[0].map((ii) => (
        <Box
          key={ii}
          sx={{
            display: "flex",
            gap: 5,
            borderRadius: "10px",
            justifyContent: "space-between",
            bgcolor: "#fff",
            my: 2,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Typography>Title</Typography>
          </Box>
          <Typography>Price</Typography>
        </Box>
      ))}
      {data.map((d, i) => (
        <Box
          key={i}
          sx={{
            borderRadius: "10px",
            bgcolor: "#fff",
            p: 2,
          }}
        >
          {d.books.map((book, ii) => (
            <Box
              key={book.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography>{ii + 1}</Typography>
                <Typography>{book.title}</Typography>
              </Box>
              <Typography>{book.price}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default UsersRentsTable;
