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
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { register } from "../../actions/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Register = (props) => {
  // const classes = useStyles();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Confirm your password"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    props
      .register(values.email, values.password)
      .then((data) => {
        values.password = "";
        values.password2 = "";
      })
      .finally(() => {
        setSubmitting(false);
      });

    props.isRegistered && handleClose();
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
    console.log("The state", oldPath);
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

    setOpenState({
      open: true,
    });
  };

  const handleClose = () => {
    window.history.pushState(null, null, pathState.oldPath);

    setOpenState({
      open: false,
    });
  };

  let serverMessage = props.error.msg;

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46.985"
              height="46.986"
              viewBox="0 0 46.985 46.986">
              <g id="logo_multidom" transform="translate(-420.461 -258.523)">
                <path
                  id="Path_169"
                  data-name="Path 169"
                  d="M467.447,258.523H420.461l23.493,23.493Z"
                  transform="translate(0 0)"
                  fill="#bbbcbc"
                />
                <path
                  id="Path_170"
                  data-name="Path 170"
                  d="M496.312,258.523l-23.493,23.493,23.493,23.492V258.523"
                  transform="translate(-28.865)"
                  fill="#888b8d"
                />
                <path
                  id="Path_171"
                  data-name="Path 171"
                  d="M420.463,258.523v46.986l23.492-23.492-23.492-23.493"
                  transform="translate(-0.001)"
                  fill="#8c8279"
                />
                <path
                  id="Path_172"
                  data-name="Path 172"
                  d="M443.954,310.882h0l-23.492,23.492h46.985l-23.493-23.492"
                  transform="translate(-0.001 -28.866)"
                  fill="#2b2322"
                />
              </g>
            </svg>
          </Stack>

          <Typography sx={{ paddingTop: 5 }} variant="subtitle1">
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
                      Register
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

export default connect(mapStateToProps, { register })(withRouter(Register));
