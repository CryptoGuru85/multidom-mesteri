import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions/profile";
import ProfileDetail from "./detail";

// const useStyles = makeStyles((theme) => ({
//   profileContainer: {
//     width: "100%",
//   },

//   profileHeader: {
//     width: "980px",
//     height: "213px",
//     background: "#FFFFFF 0% 0% no-repeat padding-box",
//     border: "1px solid #DADCE0",
//     borderRadius: "2px",
//     opacity: 1,
//     width: "50%",
//     margin: "0 auto",
//     display: "flex",
//     alignItems: "center",
//     padding: 40,
//   },

//   avatar: {
//     width: "124px",
//     height: "124px",
//     opacity: 1,
//     marginRight: 20,
//   },

//   profileName: {
//     textAlign: "left",
//     font: "bold 20px/30px Lato",
//     letterSpacing: "0.4px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   profileRole: {
//     textAlign: "left",
//     font: "bold 16px/30px Lato",
//     letterSpacing: "0.32px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   profileLocation: {
//     textAlign: "left",
//     font: "medium 15px/22px Lato",
//     letterSpacing: " 0.3px",
//     color: "#606466",
//     opacity: 1,
//     display: "flex",
//     alignItems: "center",
//   },

//   profileBody: {
//     display: "flex",
//     margin: "0 auto",
//     width: "50%",
//     paddingTop: 20,
//   },

//   profileMain: {
//     width: "620px",
//     height: "1143px",
//     background: "#FFFFFF 0% 0% no-repeat padding-box",
//     border: "1px solid #DADCE0",
//     borderRadius: "2px",
//     opacity: 1,
//     padding: 30,
//   },

//   profileRight: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     width: "340px",
//     height: "315px",
//     background: "#FFFFFF 0% 0% no-repeat padding-box",
//     border: "1px solid #DADCE0",
//     borderRadius: "2px",
//     opacity: 1,
//     marginLeft: 20,

//     padding: "25px 25px 40px 25px",
//   },

//   area: {
//     textAlign: "left",
//     font: "bold 18px/22px Lato",
//     letterSpacing: "0.36px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   locationImage: {
//     width: "290px",
//     height: "146px",
//   },

//   bodyHeader: {
//     textAlign: "left",
//     font: "bold 18px/22px Lato",
//     letterSpacing: "0.36px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   bodyHeaderIcon: {
//     display: "flex",
//     alignItems: "center",
//   },

//   bodyHeaderLabelContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     margin: 5,
//   },

//   bodyHeaderLabel: {
//     width: "37px",
//     height: "22px",
//     textAlign: "left",
//     font: "bold 16px/26px Lato",
//     letterSpacing: "0.32px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   bodyHeaderLabelSub: {
//     textAlign: "left",
//     font: "normal 14px/26px Lato",
//     letterSpacing: "0.28px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   about: {
//     textAlign: "left",
//     font: "normal 16px/26px Lato",
//     letterSpacing: "0.32px",
//     color: "#2B2322",
//     opacity: 1,
//   },

//   project: {
//     width: "155px",
//     height: "155px",
//     background: "#A2A2A2 0% 0% no-repeat padding-box",
//     borderRadius: "5px",
//     opacity: 1,
//     margin: 5,
//   },

//   callButton: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "207px",
//     height: "44px",
//     background: "#FFFFFF 0% 0% no-repeat padding-box",
//     border: " 2px solid #606466",
//     borderRadius: "4px",
//     marginRight: 15,

//     textAlign: "center",
//     font: "bold 16px/25px Lato",
//     letterSpacing: "0.32px",
//     color: "#606466",
//     opacity: 1,
//   },

//   offerButton: {
//     width: "197px",
//     height: "42px",
//     background: "#2B2322 0% 0% no-repeat padding-box",
//     boxShadow: "0px 2px 2px #00000029",
//     border: "2px solid #2B2322",
//     borderRadius: "4px",

//     textAlign: "center",
//     font: "bold 16px/25px Lato",
//     letterSpacing: "0.32px",
//     color: "#FFFFFF",
//     opacity: 1,
//   },
// }));

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
  return (
    <div>
      <ProfileDetail profile={props.profile} />
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

export default connect(mapStateToProps, { getProfile })(Profile);
