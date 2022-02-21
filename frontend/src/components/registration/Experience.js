import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getRoles, getServices, updateProfile } from "api/auth";
import useFormikValidation from "hooks/useFormikValidation";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import ChipGroup from "../ChipGroup";

const Label = styled(FormLabel)(() => ({
  marginBottom: 3,
}));

const descriptionMaxCount = 250;

const Experience = function (props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [suggestionServices, setSuggestionServices] = useState([]);
  const [service, setService] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [about, setDescription] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(null);
  const [serviceError, setServiceError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validationSchema = yup.object().shape({});

  const formik = useFormikValidation({
    initialValues: {
      role: props.profile.role,
    },
    onSubmit(values) {
      let valid = true;
      if (!role) {
        setRoleError("Role is required");
        valid = false;
      }
      if (about.trim() == "") {
        setDescriptionError("Description is required");
        valid = false;
      }
      if (services.length == 0) {
        setServiceError("Enter atleast one service");
        valid = false;
      }
      if (!valid) return;
      setSubmitting(true);
      updateProfile(props.userId, {
        role: role.id,
        services: services.map((it) => it.id),
        about,
      })
        .then(({ data }) => {
          props.setProfile(data);
          props.nextStep();
        })
        .catch(({ response }) => {})
        .finally(() => {
          setSubmitting(false);
        });
    },
    validationSchema,
  });

  const { getFieldProps, handleSubmit } = formik;

  const handleServiceRemove = (index) => {
    let service = services[index];
    let newServices = [...services];
    setServices(newServices.filter((_, i) => index != i));
  };

  const handleServiceChange = (event, newService) => {
    setService(null);
    setServiceError("");
    if (
      newService == null ||
      newService == undefined ||
      services.includes(newService)
    ) {
      return;
    }
    let newServices = [...services];
    newServices.push(newService);
    setServices(newServices);
  };

  const toggleShowAddService = () => {
    setShowAddService(!showAddService);
  };

  const handleDescriptionChange = (event) => {
    if (about.length == descriptionMaxCount) return;
    setDescription(event.target.value);
    setDescriptionError("");
  };

  const handleRoleChange = (event, newRole) => {
    setServices([]);
    setSuggestionServices([]);
    setRole(newRole);
    setRoleError("");
    console.log(newRole);
    newRole &&
      getServices({ role: newRole.id })
        .then(({ data }) => {
          setSuggestionServices(data);
          setServices(data.filter((it) => it.is_suggested));
        })
        .catch((err) => {});
  };

  const handleSkip = () => {
    props.nextStep();
  };

  useEffect(() => {
    getRoles()
      .then(({ data }) => {
        setRoles(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Typography variant="h6">Experience</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl sx={{ marginTop: 2 }}>
            <Label>Role</Label>
            <Autocomplete
              renderInput={(params) => <TextField {...params} />}
              options={roles}
              getOptionLabel={(role) => role.name}
              value={role}
              onChange={handleRoleChange}
              isOptionEqualToValue={(option, { value }) =>
                option.value == value
              }
            />
            <Box>
              <Typography variant="caption" color="error">
                {roleError}
              </Typography>
            </Box>
          </FormControl>
          <div>
            <Stack>
              <Label>Suggested services(based on role)</Label>
              <Box>
                <ChipGroup
                  items={services.map((serv) => ({
                    title: serv.name,
                  }))}
                  editable={true}
                  onRemove={handleServiceRemove}>
                  service
                </ChipGroup>
              </Box>
              {showAddService && (
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Autocomplete
                    renderInput={(params) => <TextField {...params} />}
                    options={suggestionServices}
                    getOptionLabel={(service) => service.name}
                    value={service}
                    onChange={handleServiceChange}
                    isOptionEqualToValue={(option, { value }) =>
                      option.value == value
                    }
                    fullWidth
                  />
                </Stack>
              )}
            </Stack>
            <Box>
              <Typography variant="caption" color="error">
                {serviceError}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={toggleShowAddService}
              sx={{ marginTop: 1 }}>
              Add service
            </Button>
          </div>
          <FormControl>
            <Stack direction="row">
              <Label sx={{ flex: 1 }}>Description</Label>
              <Typography variant="body2">
                {about.length}/{descriptionMaxCount} characters
              </Typography>
            </Stack>
            <TextField
              {...getFieldProps("about")}
              value={about}
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
          <Button onClick={handleSkip}>Skip step</Button>
        </Stack>
      </form>
    </>
  );
};

export default Experience;
