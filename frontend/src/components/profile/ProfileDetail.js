import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopAppBar from "components/TopAppBar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "redux/actions/profile";
import ProfileHeader from "./details/ProfileHeader";
import ProfileInformation from "./details/ProfileInformation";
import WorkArea from "./details/WorkArea";

const ProfileDetail = (props) => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (props.profile && id) {
      props.profile.user != id
        ? props.getProfile(id)
        : setProfile(props.profile);
    } else {
      props.getProfile(id);
    }
  }, [props.profile, props.getProfile, id]);

  return !profile ? (
    <></>
  ) : (
    <>
      <TopAppBar />
      <Container>
        <Toolbar />
        <Box sx={{ display: "flex", alignItems: "center", paddingY: 3 }}>
          <Link href="/">
            <IconButton>
              <ArrowBack color="primary" />
            </IconButton>
          </Link>
          <Typography fontWeight={600}>Inapoi</Typography>
        </Box>
        <ProfileHeader profile={profile} />
      </Container>
      <Container sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ProfileInformation profile={profile} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <WorkArea profile={profile} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

ProfileDetail.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile })(ProfileDetail);
