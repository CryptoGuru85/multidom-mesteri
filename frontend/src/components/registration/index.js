import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setProfile } from "redux/actions/profile";
import Contact from "./Contact";
import Experience from "./Experience";
import Personalize from "./Personalize";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Registration = function (props) {
  const [openState, setOpenState] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const handleClose = () => {
    setOpenState(false);
  };

  const handlePrevious = () => {
    if (currentStep == 1) return;
    setCurrentStep(currentStep - 1);
  };

  const gotoNextStep = () => {
    if (currentStep == 3) {
      handleClose();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    if (currentStep === 1) {
      if (props.profile.first_name != "") {
        if (props.profile.role == null) {
          setCurrentStep(2);
        } else {
          setCurrentStep(3);
        }
      }
    }
  }, []);

  return (
    <>
      <Dialog
        open={openState}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted={true}>
        <Stack direction="row" alignItems="center" spacing={1} padding={1}>
          <IconButton onClick={handlePrevious}>
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="body2">
            Step {currentStep} of 3
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
            {currentStep == 1 && (
              <Box>
                <Contact
                  userId={props.userId}
                  nextStep={gotoNextStep}
                  profile={props.profile}
                  setProfile={props.setProfile}
                />
              </Box>
            )}
            {currentStep == 2 && (
              <Experience
                userId={props.userId}
                nextStep={gotoNextStep}
                profile={props.profile}
                setProfile={props.setProfile}
              />
            )}
            {currentStep == 3 && (
              <Personalize
                userId={props.userId}
                nextStep={gotoNextStep}
                profile={props.profile}
                setProfile={props.setProfile}
              />
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
Registration.propTypes = {
  setProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setProfile })(Registration);
