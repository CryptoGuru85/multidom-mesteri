import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useFormikValidation from "hooks/useFormikValidation";
import React, { useState } from "react";
import * as yup from "yup";
import ChipGroup from "../ChipGroup";

const Label = styled(FormLabel)(() => ({
  marginBottom: 3,
}));

const descriptionMaxCount = 250;

const Experience = function () {
  const [isSubmitting, setSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [showAddService, setShowAddService] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const validationSchema = yup.object().shape({
    role: yup.string().required("Role is required"),
  });

  const formik = useFormikValidation({
    initialValues: {
      role: "",
    },
    onSubmit(values) {
      let valid = true;
      if (description.trim() == "") {
        setDescriptionError("Description is required");
        valid = false;
      }
      if (services.length == 0) {
        setServiceError("Enter atleast one service");
        valid = false;
      }
      if (!valid) return;
      setSubmitting(true);
      console.log(values);
    },
    validationSchema,
  });

  const { getFieldProps, handleSubmit } = formik;

  const handleServiceRemove = (index) => {
    let newServices = [...services];
    setServices(newServices.filter((_, i) => index != i));
  };

  const handleAddService = () => {
    if (service.trim() == "") {
      setServiceError("Service can't be empty");
      return;
    }
    let newServices = [...services];
    newServices.push(service);
    setServices(newServices);
    setService("");
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setServiceError("");
  };

  const toggleShowAddService = () => {
    setShowAddService(!showAddService);
  };

  const handleDescriptionChange = (event) => {
    if (description.length == descriptionMaxCount) return;
    setDescription(event.target.value);
    setDescriptionError("");
  };

  return (
    <>
      <Typography variant="h6">Experience</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl sx={{ marginTop: 2 }}>
            <Label>Role</Label>
            <TextField {...getFieldProps("role")} />
          </FormControl>
          <div>
            <Stack>
              <Label>Suggested services(based on role)</Label>
              <Box>
                <ChipGroup
                  items={services.map((serv) => ({
                    title: serv,
                  }))}
                  editable={true}
                  onRemove={handleServiceRemove}>
                  service
                </ChipGroup>
              </Box>
              {showAddService && (
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <TextField
                    value={service}
                    onChange={handleServiceChange}
                    sx={{ marginTop: 2, flex: 1 }}
                    placeholder="Add service"
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleAddService}>
                    Add
                  </Button>
                </Stack>
              )}
            </Stack>
            <Box>
              <Typography variant="caption" color="error">
                {serviceError}
              </Typography>
            </Box>
            {!showAddService && (
              <Button
                variant="outlined"
                onClick={toggleShowAddService}
                sx={{ marginTop: 1 }}>
                Add service
              </Button>
            )}
          </div>
          <FormControl>
            <Stack direction="row">
              <Label sx={{ flex: 1 }}>Description</Label>
              <Typography variant="body2">
                {description.length}/{descriptionMaxCount} characters
              </Typography>
            </Stack>
            <TextField
              {...getFieldProps("description")}
              value={description}
              onChange={handleDescriptionChange}
              multiline
              rows={6}
            />
            <Box>
              <Typography variant="caption" color="error">
                {descriptionError}
              </Typography>
            </Box>
          </FormControl>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            size="large"
            type="submit">
            Continue
          </LoadingButton>
          <Button>Skip step</Button>
        </Stack>
      </form>
    </>
  );
};

export default Experience;
