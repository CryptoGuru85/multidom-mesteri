import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { register } from "../../redux/actions/auth";
import Logo from "./../Logo";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Register = (props) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Confirm your password"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    props.register(values);

    setSubmitting(false);
    values.password = "";
    props.handleDialogStateChange("login");
  };

  const [openState, setOpenState] = useState({
    open: false,
  });

  const [pathState, setPathState] = useState({
    oldPath: null,
    newPath: null,
  });

  const handleOpen = () => {
    let oldPath = window.location.href;
    const backTo = oldPath.split(window.location.origin);

    const { id, username } = props;

    const newPath = `/#/register`;
    if (backTo[1] === newPath) {
      oldPath = `/#/`;
    }

    setPathState({
      oldPath: oldPath,
      newPath: newPath,
    });

    window.history.pushState(null, null, newPath);
    props.handleDialogStateChange("register");
  };

  const handleClose = () => {
    window.history.pushState(null, null, pathState.oldPath);
    props.handleDialogStateChange(null);
  };

  useEffect(() => {
    if (props.activeDialog == "register") {
      !openState.open && setOpenState({ open: true });
    } else {
      openState.open && setOpenState({ open: false });
    }
  }, [props.activeDialog]);

  const alreadyRegistered = () => {
    props.handleDialogStateChange("login");
  };

  const serverMessage = props.error;

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Register
      </Button>
      <Dialog
        open={openState.open}
        onClose={handleClose}
        fullWidth
        TransitionComponent={Transition}
        maxWidth="xs">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack alignItems="center" sx={{ scale: "0.8" }}>
            <Logo />
          </Stack>

          <Typography sx={{ paddingTop: 5 }} variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              password2: "",
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
            validateOnChange={true}>
            {({ isValid, dirty, isSubmitting }) => {
              return (
                <Form>
                  <InputLabel sx={{ paddingTop: 2 }}>Email</InputLabel>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="email"
                    component={TextField}
                    type="text"
                  />

                  <InputLabel sx={{ paddingTop: 2 }}>Password</InputLabel>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="password"
                    component={TextField}
                    type="password"
                  />

                  <InputLabel sx={{ paddingTop: 2 }}>
                    Confirm Password
                  </InputLabel>
                  <Field
                    variant="outlined"
                    fullWidth
                    name="password2"
                    component={TextField}
                    type="password"
                  />
                  <Stack sx={{ paddingTop: 3 }}>
                    <LoadingButton
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                      loading={isSubmitting}
                      sx={{ flex: 1, paddingY: 1.5 }}
                      variant="contained">
                      Continue
                    </LoadingButton>
                  </Stack>

                  {serverMessage ? (
                    <Typography
                      align="center"
                      color="error"
                      display="block"
                      sx={{ marginTop: 2 }}>
                      {serverMessage && serverMessage.email}
                    </Typography>
                  ) : (
                    ""
                  )}

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{ marginTop: 3 }}>
                    <Typography>Already registered? </Typography>
                    <Typography
                      sx={{ textDecoration: "underline", fontWeight: 600 }}
                      onClick={alreadyRegistered}>
                      Login
                    </Typography>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  isRegistered: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isRegistered: state.auth.isRegistered,
  error: state.errors,
});

export default connect(mapStateToProps, { register })(Register);
