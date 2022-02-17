import { Fragment, React, useCallback, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = function (props) {
  const [activeDialog, setActiveDialog] = useState(null);
  const handleDialogStateChange = useCallback(
    (openDialog) => {
      setActiveDialog(openDialog);
    },
    [setActiveDialog]
  );
  return (
    <Fragment>
      <Login
        activeDialog={activeDialog}
        handleDialogStateChange={handleDialogStateChange}
      />
      <Register activeDialog={activeDialog} />
    </Fragment>
  );
};

export default Auth;
