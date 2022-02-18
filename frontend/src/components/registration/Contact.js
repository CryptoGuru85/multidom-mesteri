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
import { capitalCase } from "change-case";
import useFormikValidation from "hooks/useFormikValidation";
import React, { useState } from "react";
import * as yup from "yup";

const entities = ["person", "company"];

const Label = styled(FormLabel)(() => ({
  marginBottom: 1,
}));

const Contact = function () {
  const [isLoading, setLoading] = useState();
  const validationSchema = yup.object().shape({
    entity: yup
      .string()
      .oneOf([...entities, null, ""])
      .required("Entity is required"),
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    mobile: yup.string().required("Mobile is required"),
  });
  const formik = useFormikValidation({
    initialValues: {
      entity: entities[0],
      fname: "",
      lname: "",
      address: "",
      city: "",
      mobile: "",
    },
    onSubmit(values) {
      console.log(values);
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
            <RadioGroup row {...getFieldProps("entity", true)}>
              {entities.map((entity) => (
                <FormControlLabel
                  key={entity}
                  value={entity}
                  control={<Radio />}
                  label={capitalCase(entity)}
                  sx={{ flex: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl>
            <Label>First Name</Label>
            <TextField {...getFieldProps("fname")} fullWidth />
          </FormControl>
          <FormControl>
            <Label>Last Name</Label>
            <TextField {...getFieldProps("lname")} fullWidth />
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
              placeholder="+40750010001"
            />
          </FormControl>
          <LoadingButton
            loading={isLoading}
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
