import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Overview from "../components/profile/Overview";
import { getProfileList } from "../redux/actions/profile";

const Home = (props) => {
  const [profileListState, setProfileListState] = useState([]);

  const [filterInputState, setFilterInputState] = useState({
    searchInput: "",
    locationInput: "",
    entityInput: "",
  });

  useEffect(() => {
    props.getProfileList(filterInputState);
  }, []);

  useEffect(() => {
    props.getProfileList(filterInputState);
  }, [props.auth]);

  useEffect(() => {
    setProfileListState(props.profile_list);
  }, [props.profile_list]);

  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {profileListState.length > 0 &&
        profileListState.map((data, index) => (
          <Grid item key={index} xs={6} md={4} lg={3}>
            <Overview data={data} />
          </Grid>
        ))}
    </Grid>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile_list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  profile_list: state.profile.profile_list,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfileList })(Home);
