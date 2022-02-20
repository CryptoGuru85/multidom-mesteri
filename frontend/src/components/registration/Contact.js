import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { updateProfile } from "api/auth";
import { capitalCase } from "change-case";
import useFormikValidation from "hooks/useFormikValidation";
import React, { useState } from "react";
import * as yup from "yup";

const entities = ["INDIVIDUAL", "COMPANY"];
const entityLabels = ["person", "company"];
const mobileRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Label = styled(FormLabel)(() => ({
  marginBottom: 1,
}));

const Contact = function (props) {
  const [isSubmitting, setIsSubmitting] = useState();
  const profile = props.profile;

  const initialValues = {
    user_type: profile.user_type,
    first_name: profile.first_name,
    last_name: profile.last_name,
    address: profile.address,
    city: profile.city,
    mobile: profile.mobile,
  };
  const validationSchema = yup.object().shape({
    user_type: yup
      .string()
      .oneOf([...entities, null, ""])
      .required("Entity is required"),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    mobile: yup
      .string()
      .required("Mobile is required")
      .max(13, "Invalid mobile")
      .min(9, "Invalid mobile")
      .matches(mobileRegExp, "Invalid mobile"),
  });
  const formik = useFormikValidation({
    initialValues,
    onSubmit(values) {
      updateProfile(props.userId, values)
        .then(({ data }) => {
          props.nextStep();
          props.setProfile(data);
        })
        .catch(({ response }) => {})
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    validationSchema,
  });
  const { getFieldProps, handleSubmit } = formik;

  return (
    <Stack>
      <Typography variant="h6">Contact Information</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl sx={{ marginTop: 2 }}>
            <Label>Entity</Label>
            <RadioGroup row {...getFieldProps("user_type", true)}>
              {entities.map((entity, index) => (
                <FormControlLabel
                  key={entity}
                  value={entity}
                  control={<Radio />}
                  label={capitalCase(entityLabels[index])}
                  sx={{ flex: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl>
            <Label>First Name</Label>
            <TextField {...getFieldProps("first_name")} fullWidth />
          </FormControl>
          <FormControl>
            <Label>Last Name</Label>
            <TextField {...getFieldProps("last_name")} fullWidth />
          </FormControl>
          <FormControl>
            <Label>Address</Label>
            <TextField {...getFieldProps("address")} fullWidth />
          </FormControl>
          <FormControl>
            <Label>City</Label>
            <TextField {...getFieldProps("city")} fullWidth />
          </FormControl>
          <FormControl>
            <Label>Mobile</Label>
            <TextField
              {...getFieldProps("mobile")}
              fullWidth
              placeholder="40750010001"
            />
          </FormControl>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            fullWidth
            size="large"
            type="submit">
            Continue
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};
export default Contact;
