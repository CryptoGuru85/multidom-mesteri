import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChipGroup from "components/ChipGroup";
import React, { useEffect, useState } from "react";

const ProfileOverview = (props) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(props.data);
  }, [props.data]);

  return (
    <Card component={Link} href={`/profile/${profile.user}`}>
      <CardContent>
        <Stack spacing={1.5}>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Avatar
              sx={{ width: 54, height: 54 }}
              src={profile.profile_picture && profile.profile_picture}
            />
          </Box>
          <Typography variant="h6" textAlign="center">
            {profile.first_name && profile.first_name}{" "}
            {profile.last_name && profile.last_name}
          </Typography>
          <Typography sx={{ fontWeight: 400 }} textAlign="center">
            {profile.role ? profile.role.name : "--"}
          </Typography>
          <Stack spacing={0.2} direction="row" justifyContent="center">
            <LocationOnIcon />
            <Typography>{profile.city ? profile.city.name : "--"}</Typography>
          </Stack>
          {profile.services && (
            <ChipGroup
              items={profile?.services?.map((service) => ({
                title: service.name,
              }))}
              justifyContent={"center"}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
