import AssignmentIcon from "@mui/icons-material/Assignment";
import EuroIcon from "@mui/icons-material/Euro";
import Groups from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChipGroup from "components/ChipGroup";
import React from "react";

const ProfileInformation = (props) => {
  const profile = props.profile;
  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={5}>
            <Stack spacing={2}>
              <Typography variant="h6">Information</Typography>
              <Divider />
              <Grid container rowSpacing={3}>
                <Grid item xs={6} md={4}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    justifyContent="center">
                    <AssignmentIcon />
                    <Stack>
                      <Typography variant="h6">
                        {profile.experience ?? "--"} Years
                      </Typography>
                      <Typography>Experience</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    justifyContent="center">
                    <Groups />
                    <Stack>
                      <Typography variant="h6">
                        {profile.team ?? "--"} people
                      </Typography>
                      <Typography>Team size</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    justifyContent="center">
                    <EuroIcon />
                    <Stack>
                      <Typography variant="h6">
                        {profile.price_estimation ? "Yes" : "No"}
                      </Typography>
                      <Typography>Price for estimation</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Description</Typography>
              <Divider />
              <Typography>{profile.about}</Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Services Offered</Typography>
              <Divider />
              <ChipGroup
                items={profile.services.map((service) => ({
                  title: service.name,
                }))}
              />
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Portfolio</Typography>
              <Divider />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileInformation;
