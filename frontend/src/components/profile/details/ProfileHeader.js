import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const ProfileHeader = (props) => {
  const [showPhone, setShowPhone] = useState(false);
  const profile = props.profile;

  const toggleShowPhone = () => {
    setShowPhone(!showPhone);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3} direction={{ md: "row", xs: "column" }}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={profile.profile_picture}
              />
            </Box>
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography variant="h6" textAlign={{ xs: "center", md: "left" }}>
                {profile.first_name} {profile.last_name}
              </Typography>
              <Typography
                sx={{ fontWeight: 500, marginLeft: 100 }}
                textAlign={{ xs: "center", md: "left" }}>
                {profile.role ? profile.role.name : "--"}
              </Typography>
              <Stack
                spacing={0.2}
                direction="row"
                justifyContent={{ xs: "center", md: "flex-start" }}>
                <LocationOnIcon />
                <Typography>
                  {profile.city ? profile.city.name : "--"}
                </Typography>
              </Stack>
            </Stack>
            <Stack>
              <Box sx={{ flex: 1 }}></Box>
              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ md: "end", xs: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                  onClick={toggleShowPhone}>
                  <PhoneIcon sx={{ marginRight: 1 }} />
                  {showPhone ? profile.mobile : "Call"}
                </Button>
                <Button variant="contained" sx={{ minWidth: 120 }}>
                  Ask Offer
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
