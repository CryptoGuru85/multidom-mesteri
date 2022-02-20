import Stack from "@mui/material/Stack";
import { React, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = function (props) {
  const [activeDialog, setActiveDialog] = useState(null);

  return (
    <Stack direction="row">
      <Login
        activeDialog={activeDialog}
        handleDialogStateChange={setActiveDialog}
      />
      <Register
        activeDialog={activeDialog}
        handleDialogStateChange={setActiveDialog}
      />
    </Stack>
  );
};

export default Auth;
