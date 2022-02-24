import Stack from "@mui/material/Stack";
import { React, useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = function (props) {
  const [activeDialog, setActiveDialog] = useState(null);

  useEffect(() => {
    props.activeDialog && setActiveDialog(props.activeDialog);
  }, [props.activeDialog]);

  return (
    <Stack direction="row">
      <Login
        dialogOnly={props.dialogOnly}
        activeDialog={activeDialog}
        handleDialogStateChange={setActiveDialog}
      />
      <Register
        dialogOnly={props.dialogOnly}
        activeDialog={activeDialog}
        handleDialogStateChange={setActiveDialog}
      />
    </Stack>
  );
};

export default Auth;
