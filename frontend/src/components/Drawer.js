import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProfileList } from "redux/actions/profile";
import { getCities } from "redux/actions/registration";

const drawerWidth = 340;
const entities = ["COMPANY", "INDIVIDUAL"];
const entityLabels = ["Company", "Person"];

const DrawerEls = (props) => {
  const [filters, setFilters] = useState(
    props.filters || {
      services_name: null,
      city: null,
      user_type: "",
    }
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Toolbar />
      <Stack spacing={4}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={props.handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 600 }}>
              Caută dupa serviciu
            </Typography>
            <Typography
              onClick={() => {
                setFilters({
                  services_name: "",
                  city: "",
                  user_type: "",
                });
                props.handleClearFilters();
              }}
              color="secondary"
              sx={{ fontWeight: 600, cursor: "pointer" }}>
              Clear filters
            </Typography>
          </Stack>
          <TextField
            value={filters.services_name}
            onChange={(event) => {
              setFilters({ ...filters, services_name: event.target.value });
            }}
            placeholder="Montaj acoperiș, reparație acoperiș"
            fullWidth
          />
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 600 }}>Location</Typography>
          <Select
            fullWidth
            onChange={(event) => {
              setFilters({ ...filters, city: event.target.value });
            }}
            value={filters.city}
            placeholder="București, Iași, Cluj">
            {props.cities &&
              props.cities.length > 0 &&
              props.cities?.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
          </Select>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 600 }}>Entity</Typography>
          <Stack direction="row" justifyContent="space-between">
            {entities.map((entity, index) => (
              <FormControlLabel
                key={index}
                onChange={(event) => {
                  setFilters({ ...filters, user_type: event.target.value });
                }}
                control={<Checkbox />}
                checked={
                  filters.user_type && filters.user_type === entity
                    ? true
                    : false
                }
                value={entity}
                label={entityLabels[index]}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            props.handleFilter(filters);
          }}>
          Filtrează
        </Button>
      </Stack>
    </Box>
  );
};

const MDrawer = (props) => {
  const [filters, setFilters] = useState({
    services_name: "",
    city: "",
    user_type: "",
  });
  const [cities, setCities] = useState([]);

  const handleClearFilters = () => {
    props.handleDrawerToggle();
    props.getProfileList({});
  };

  const handleFilter = (filters) => {
    props.handleDrawerToggle();
    setFilters(filters);
  };

  useEffect(() => {
    props.getProfileList(filters);
  }, [filters]);

  useEffect(() => {
    !props.cities || props.cities.length === 0
      ? props.getCities()
      : setCities(props.cities);
  }, [props.cities]);

  return (
    <Fragment>
      <Drawer
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{ keepMounted: true }}
        open={props.mobileOpen}>
        <DrawerEls
          handleDrawerToggle={props.handleDrawerToggle}
          handleFilter={handleFilter}
          filters={filters}
          cities={cities}
          handleClearFilters={handleClearFilters}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{ keepMounted: true }}
        open={props.mobileOpen}>
        <DrawerEls
          handleDrawerToggle={props.handleDrawerToggle}
          handleFilter={handleFilter}
          filters={filters}
          cities={cities}
          handleClearFilters={handleClearFilters}
        />
      </Drawer>
    </Fragment>
  );
};

MDrawer.propTypes = {
  profile_list: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  getProfileList: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile_list: state.profile.profile_list,
  cities: state.registration.cities,
});

export default connect(mapStateToProps, { getProfileList, getCities })(MDrawer);
