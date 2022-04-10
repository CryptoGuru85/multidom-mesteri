import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Drawer from "./Drawer";
import ProfileOverview from "./profile/ProfileOverview";
import TopAppBar from "./TopAppBar";

const Home = (props) => {
  const [profileList, setProfileList] = useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    props.profile_list && setProfileList(props.profile_list || []);
  }, [props.profile_list]);

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
        <Grid container rowSpacing={3} columnSpacing={3}>
          {profileList &&
            profileList.length > 0 &&
            profileList?.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                <ProfileOverview data={data} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

Home.propTypes = {
  profile_list: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profile_list: state.profile.profile_list,
});

export default connect(mapStateToProps)(Home);
