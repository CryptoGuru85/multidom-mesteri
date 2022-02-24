import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProfile, getProfileList } from "../redux/actions/profile";
import Home from "./../pages/Home";
import Drawer from "./Drawer";
import TopAppBar from "./TopAppBar";

function Header(props) {
  const [profile, setProfile] = useState();
  const [filterInputState, setFilterInputState] = useState({
    searchInput: "",
    locationInput: "",
    entityInput: "",
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    props.getProfileList(filterInputState);
    props.user && props.getProfile(props.user.id);
    props.profile && setProfile(props.profile);
  }, [props.user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopAppBar />
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}>
        <Toolbar />
        <Box
          sx={{
            display: { sm: "flex", md: "none" },
            justifyContent: "flex-end",
            marginBottom: 1,
          }}>
          <Button variant="text" onClick={handleDrawerToggle}>
            Filter
          </Button>
        </Box>
        <Home />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile_list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,

  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile_list: state.profile.profile_list,
  loading: state.profile.loading,
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getProfileList, getProfile })(Header);
