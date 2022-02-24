import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { Fragment, useState } from "react";

const drawerWidth = 340;

const DrawerEls = (props) => {
  const [filterInputState, setFilterInputState] = useState({
    searchInput: "",
    locationInput: "",
    entityInput: "",
  });

  const [individualState, setIndividualState] = useState(false);
  const [companyState, setCompanyState] = useState(false);

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
            <Typography color="secondary" sx={{ fontWeight: 600 }}>
              Clear filters
            </Typography>
          </Stack>
          <TextField
            onChange={(event) => {
              const newService = event.target.value;
              setFilterInputState((prevFilterState) => ({
                searchInput: newService,
                locationInput: prevFilterState.locationInput,
                entityInput: prevFilterState.entityInput,
              }));
            }}
            placeholder="Montaj acoperiș, reparație acoperiș"
            fullWidth
          />
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 600 }}>Location</Typography>
          <TextField
            fullWidth
            onChange={(event) => {
              const newLocation = event.target.value;
              setFilterInputState((prevFilterState) => ({
                locationInput: newLocation,
                searchInput: prevFilterState.searchInput,
                entityInput: prevFilterState.entityInput,
              }));
            }}
            placeholder="București, Iași, Cluj"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 600 }}>Entity</Typography>
          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              control={<Checkbox />}
              checked={companyState}
              onChange={(event) => {
                setCompanyState(!companyState);
                !companyState && setIndividualState(false);
                const newEntity = event.target.value;
                setFilterInputState((prevFilterState) => ({
                  locationInput: prevFilterState.locationInput,
                  searchInput: prevFilterState.searchInput,
                  entityInput: companyState ? "" : newEntity,
                }));
              }}
              value="Company"
              label="Company"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={individualState}
              onChange={(event) => {
                setIndividualState(!individualState);
                !individualState && setCompanyState(false);
                const newEntity = event.target.value;
                setFilterInputState((prevFilterState) => ({
                  locationInput: prevFilterState.locationInput,
                  searchInput: prevFilterState.searchInput,
                  entityInput: individualState ? "" : newEntity,
                }));
              }}
              value="Individual"
              label="Person"
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          onClick={props.handleDrawerToggle}>
          Filtrează
        </Button>
      </Stack>
    </Box>
  );
};

export default function MDrawer(props) {
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
        <DrawerEls handleDrawerToggle={props.handleDrawerToggle} />
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
        <DrawerEls handleDrawerToggle={props.handleDrawerToggle} />
      </Drawer>
    </Fragment>
  );
}
