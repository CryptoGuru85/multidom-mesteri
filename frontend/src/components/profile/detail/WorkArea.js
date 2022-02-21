import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const WorkArea = (props) => {
  const profile = props.profile;
  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Area of work</Typography>
            <Stack spacing={0.2} direction="row" alignItems="center">
              <LocationOnIcon />
              <Typography>{profile.city}</Typography>
            </Stack>
            <Box>
              <img src="https://cdn.discordapp.com/attachments/926446798065778718/934898639212515379/unknown.png" />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default WorkArea;
