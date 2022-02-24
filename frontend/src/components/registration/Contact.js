import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getCities as getCitiesApi, updateProfile } from "api/auth";
import { capitalCase } from "change-case";
import useFormikValidation from "hooks/useFormikValidation";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { getCities } from "./../../redux/actions/registration";

const entities = ["INDIVIDUAL", "COMPANY"];
const entityLabels = ["person", "company"];
const mobileRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Label = styled(FormLabel)(() => ({
  marginBottom: 1,
}));

const Contact = function (props) {
  const [isSubmitting, setIsSubmitting] = useState();
  const [cities, setCities] = useState([]);
  const profile = props.profile;

  const initialValues = {
    user_type: profile.user_type,
    first_name: profile.first_name,
    last_name: profile.last_name,
    address: profile.address,
    city: profile.city ? profile.city.id : null,
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
      setIsSubmitting(true);
      updateProfile(props.userId, values)
        .then(({ data }) => {
          props.setProfile(data);
          props.nextStep();
        })
        .catch(({ response }) => {})
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    validationSchema,
  });
  const { getFieldProps, handleSubmit } = formik;

  useEffect(() => {
    let cancel = false;
    getCitiesApi()
      .then(({ data }) => {
        !cancel && setCities(data);
      })
      .catch(({ response }) => {});

    return () => {
      cancel = true;
    };
  }, [props.cities]);

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
            <Select {...getFieldProps("city", true)} fullWidth>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Label>Mobile</Label>
            <TextField
              {...getFieldProps("mobile")}
              fullWidth
              placeholder="40750010001"
            />
          </FormControl>
        </Stack>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          fullWidth
          size="large"
          sx={{ marginTop: 5 }}
          type="submit">
          Continue
        </LoadingButton>
      </form>
    </Stack>
  );
};

Contact.propTypes = {
  getCities: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.registration.cities,
});

export default connect(mapStateToProps, { getCities })(Contact);
