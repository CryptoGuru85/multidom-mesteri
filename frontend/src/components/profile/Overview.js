//Style
//Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Local imports

const useStyles = makeStyles({
  container: {
    width: "400px",
    height: "334px",
    margin: 15,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .name": {
      textAlign: "center",
      font: "normal normal bold 20px/30px Lato",
      letterSpacing: "0.4px",
      color: "#2B2322",
      opacity: 1,
      marginBottom: 5,
    },
    "& .role": {
      textAlign: "center",
      font: "normal normal bold 16px/30px Lato",
      letterSpacing: "0.32px",
      color: "#2B2322",
      opacity: 1,
      marginBottom: 5,
    },
    "& .location": {
      display: "flex",
      textAlign: "left",
      font: "normal normal medium 15px/22px Lato",
      letterSpacing: "0.3px",
      color: "#606466",
      opacity: 1,
    },
    "& .service-container": {
      margin: 8,
      textAlign: "center",
      "& .service": {
        margin: 5,
      },
    },
  },
  avatar: {
    width: "64px",
    height: "64px",
    marginBottom: 5,
  },
});

const Overview = (props) => {
  const classes = useStyles();

  const [profileState, setProfileState] = useState({});

  useEffect(() => {
    setProfileState(props.data);
  }, [props.data]);

  return (
    <Card
      className={classes.container}
      component={Link}
      to={`/profile/${profileState.id}`}>
      <Avatar
        className={classes.avatar}
        src={profileState.profile_picture && profileState.profile_picture}
      />
      <Typography className="name">
        {profileState.first_name && profileState.first_name}{" "}
        {profileState.last_name && profileState.last_name}
      </Typography>
      {profileState.role && (
        <Typography className="role">{profileState.role.name}</Typography>
      )}
      {profileState.city && (
        <div className="location">
          <LocationOnIcon /> <Typography>{profileState.city}</Typography>
        </div>
      )}
      {profileState.services && profileState.services.length > 0 && (
        <div className="service-container">
          {profileState.services.map((data, index) => (
            <Chip key={index} className="service" label={data.name} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Overview;
