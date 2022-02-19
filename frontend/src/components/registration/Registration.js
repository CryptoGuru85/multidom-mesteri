import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
// import Experience from "./Experience";
import Personalize from "./Personalize";
// import Contact from "./Contact";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Registration = function () {
  const [openState, setOpenState] = useState(true);
  const handleClose = () => {
    setOpenState(false);
  };

  return (
    <>
      <Dialog
        open={openState}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}>
        <Stack direction="row" alignItems="center" spacing={1} padding={1}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="body2">
            Step 1 of 3
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent>
          <Stack
            sx={{
              paddingTop: 2,
              paddingX: {
                sm: 1,
                md: 4,
              },
            }}>
            {/* <Contact /> */}
            {/* <Experience /> */}
            <Personalize />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Registration;
