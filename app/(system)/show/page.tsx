import UserShow from "@/components/UserShow";
import { Box, Typography } from "@mui/material";
import { Suspense } from "react";

const showPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          my: 2,
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Typography>Using API</Typography>
      </Box>
      <Suspense fallback={<>some</>}>
        <UserShow />;
      </Suspense>
    </Box>
  );
};

export default showPage;
