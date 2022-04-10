import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import Logo from "./../components/Logo";

const NotFound = () => {
  return (
    <>
      <Stack
        spacing={5}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}>
        <Logo />
        <Typography color="gray" variant="h3">
          Not Found
        </Typography>
      </Stack>
    </>
  );
};

export default NotFound;
