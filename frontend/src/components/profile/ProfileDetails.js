import AssignmentIcon from "@mui/icons-material/Assignment";
import EuroIcon from "@mui/icons-material/Euro";
import Groups from "@mui/icons-material/Groups";
//Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProfile } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    width: "100%",
  },

  profileHeader: {
    width: "980px",
    height: "213px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #DADCE0",
    borderRadius: "2px",
    opacity: 1,
    width: "50%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    padding: 40,
  },

  avatar: {
    width: "124px",
    height: "124px",
    opacity: 1,
    marginRight: 20,
  },

  profileName: {
    textAlign: "left",
    font: "bold 20px/30px Lato",
    letterSpacing: "0.4px",
    color: "#2B2322",
    opacity: 1,
  },

  profileRole: {
    textAlign: "left",
    font: "bold 16px/30px Lato",
    letterSpacing: "0.32px",
    color: "#2B2322",
    opacity: 1,
  },

  profileLocation: {
    textAlign: "left",
    font: "medium 15px/22px Lato",
    letterSpacing: " 0.3px",
    color: "#606466",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },

  profileBody: {
    display: "flex",
    margin: "0 auto",
    width: "50%",
    paddingTop: 20,
  },

  profileMain: {
    width: "620px",
    height: "1143px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #DADCE0",
    borderRadius: "2px",
    opacity: 1,
    padding: 30,
  },

  profileRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "340px",
    height: "315px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #DADCE0",
    borderRadius: "2px",
    opacity: 1,
    marginLeft: 20,

    padding: "25px 25px 40px 25px",
  },

  area: {
    textAlign: "left",
    font: "bold 18px/22px Lato",
    letterSpacing: "0.36px",
    color: "#2B2322",
    opacity: 1,
  },

  locationImage: {
    width: "290px",
    height: "146px",
  },

  bodyHeader: {
    textAlign: "left",
    font: "bold 18px/22px Lato",
    letterSpacing: "0.36px",
    color: "#2B2322",
    opacity: 1,
  },

  bodyHeaderIcon: {
    display: "flex",
    alignItems: "center",
  },

  bodyHeaderLabelContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 5,
  },

  bodyHeaderLabel: {
    width: "37px",
    height: "22px",
    textAlign: "left",
    font: "bold 16px/26px Lato",
    letterSpacing: "0.32px",
    color: "#2B2322",
    opacity: 1,
  },

  bodyHeaderLabelSub: {
    textAlign: "left",
    font: "normal 14px/26px Lato",
    letterSpacing: "0.28px",
    color: "#2B2322",
    opacity: 1,
  },

  about: {
    textAlign: "left",
    font: "normal 16px/26px Lato",
    letterSpacing: "0.32px",
    color: "#2B2322",
    opacity: 1,
  },

  project: {
    width: "155px",
    height: "155px",
    background: "#A2A2A2 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1,
    margin: 5,
  },

  callButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "207px",
    height: "44px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: " 2px solid #606466",
    borderRadius: "4px",
    marginRight: 15,

    textAlign: "center",
    font: "bold 16px/25px Lato",
    letterSpacing: "0.32px",
    color: "#606466",
    opacity: 1,
  },

  offerButton: {
    width: "197px",
    height: "42px",
    background: "#2B2322 0% 0% no-repeat padding-box",
    boxShadow: "0px 2px 2px #00000029",
    border: "2px solid #2B2322",
    borderRadius: "4px",

    textAlign: "center",
    font: "bold 16px/25px Lato",
    letterSpacing: "0.32px",
    color: "#FFFFFF",
    opacity: 1,
  },
}));

const Profile = (props) => {
  const [profileState, setProfileState] = useState({});
  const [showMobileState, setShowMobileState] = useState(false);

  useEffect(() => {
    props.getProfile(props.match.params.id);
  }, []);

  useEffect(() => {
    setProfileState(props.profile);
  }, [props.profile]);

  const mobileToggle = () => {
    setShowMobileState(!showMobileState);
  };

  console.log("The profile", profileState);

  const classes = useStyles();
  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileHeader}>
        <Avatar
          className={classes.avatar}
          src={profileState.profile_picture && profileState.profile_picture}
        />
        <div>
          <Typography className={classes.profileName}>
            {profileState &&
              `${profileState.first_name} ${profileState.last_name}`}
          </Typography>
          <Typography className={classes.profileRole}>
            {profileState.role && profileState.role.name}
          </Typography>
          <Typography className={classes.profileLocation}>
            {" "}
            <LocationOnIcon />
            {profileState && profileState.city}
          </Typography>
        </div>
        <div style={{ display: "flex", alignSelf: "end", marginLeft: 100 }}>
          <button onClick={mobileToggle} className={classes.callButton}>
            <PhoneIcon style={{ width: "24px", height: "24px", margin: 10 }} />
            {showMobileState ? profileState.mobile : "Apeleaza"}
          </button>
          <button className={classes.offerButton}>Solicita oferta</button>
        </div>
      </div>
      <div className={classes.profileBody}>
        <div className={classes.profileMain}>
          <Typography className={classes.bodyHeader}>Informatii</Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}>
            <div className={classes.bodyHeaderIcon}>
              <AssignmentIcon />
              <div className={classes.bodyHeaderLabelContainer}>
                <Typography className={classes.bodyHeaderLabel}>
                  {profileState.experience}-ani
                </Typography>
                <Typography className={classes.bodyHeaderLabelSub}>
                  Experienta
                </Typography>
              </div>
            </div>

            <div className={classes.bodyHeaderIcon}>
              <Groups />
              <div className={classes.bodyHeaderLabelContainer}>
                <Typography className={classes.bodyHeaderLabel}>
                  {profileState.team}
                </Typography>
                <Typography className={classes.bodyHeaderLabelSub}>
                  Echipa
                </Typography>
              </div>
            </div>

            <div className={classes.bodyHeaderIcon}>
              <EuroIcon />
              <div className={classes.bodyHeaderLabelContainer}>
                <Typography className={classes.bodyHeaderLabel}>
                  {profileState.price_estimate ? "Da" : "Nu"}
                </Typography>
                <Typography className={classes.bodyHeaderLabelSub}>
                  Pret constatare
                </Typography>
              </div>
            </div>
          </div>

          <Typography className={classes.bodyHeader}>Descriere</Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <p className={classes.about}>
            {profileState.profile_picture && profileState.about}
          </p>

          <Typography className={classes.bodyHeader}>
            Servicii oferite
          </Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          {profileState.services &&
            profileState.services.map((data, index) => (
              <Chip key={index} style={{ margin: 5 }} label={data.name} />
            ))}

          <Typography style={{ marginTop: 20 }} className={classes.bodyHeader}>
            Portofoliu
          </Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Grid container>
            {profileState.projects &&
              profileState.projects.map((data, index) => (
                <Grid key={index} item>
                  <Avatar
                    className={classes.project}
                    src={data.profile_picture}
                  />
                </Grid>
              ))}
          </Grid>
        </div>

        <div className={classes.profileRight}>
          <Typography className={classes.area}>Zona de operare</Typography>
          <Typography className={classes.profileLocation}>
            {" "}
            <LocationOnIcon /> {profileState && profileState.city}
          </Typography>
          <img
            className={classes.locationImage}
            src="https://cdn.discordapp.com/attachments/926446798065778718/934898639212515379/unknown.png"
          />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile })(withRouter(Profile));
