import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser, logout } from "redux/actions/auth";
import { getProfile } from "redux/actions/profile";
import Auth from "./auth";
import Logo from "./Logo";
import Registration from "./registration";

const TopAppBar = (props) => {
  const [openState, setOpenState] = useState(null);
  const [openAuthState, setOpenAuthState] = useState(null);
  const [profile, setProfile] = useState();

  const [openAuthDialog, setOpenAuthDialog] = useState(null);

  // const handleOpenAuth = (activeDialog) => {
  //   setOpenAuth(activeDialog);
  // };

  const handleOpen = (event) => {
    setOpenState(event.currentTarget);
  };

  const handleClose = () => {
    setOpenState(null);
  };

  const handleAuthOpen = (event) => {
    setOpenAuthState(event.currentTarget);
  };

  const handleAuthClose = () => {
    setOpenAuthState(null);
  };

  useEffect(() => {
    if (props.user && props.profile) {
      props.user.id != props.profile.user
        ? props.getProfile(props.user.id)
        : setProfile(props.profile);
    } else {
      !props.user && props.loadUser();
      if (props.isAuthenticated) {
        !props.profile && props.user && props.getProfile(props.user.id);
      }
    }
  }, [props.profile, props.user, props.isAuthenticated]);
  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {profile &&
          profile.is_owner &&
          (profile.first_name === "" ||
            profile.role == null ||
            profile.profile_picture == null) &&
          props.isAuthenticated && (
            <Registration
              userId={profile.user}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}>
            <Box>
              <Link href="/">
                <Stack direction="row" spacing={3} alignItems="center">
                  <Logo />
                  <Typography color="primary">Meșteri</Typography>
                </Stack>
              </Link>
            </Box>
            <Box>
              {props.isAuthenticated && (
                <Box>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleAuthOpen}
                    color="inherit">
                    <Avatar src={props.profile.profile_picture} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={openAuthState}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(openAuthState)}
                    onClose={handleAuthClose}>
                    <MenuItem>
                      <Link href={profile ? `/profile/${profile.user}` : "#"}>
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={props.logout}>Logout</MenuItem>
                  </Menu>
                </Box>
              )}
              {!props.isAuthenticated && (
                <Stack direction="row">
                  <Box display={{ xs: "none", md: "block" }}>
                    <Auth />
                  </Box>

                  {openAuthDialog && (
                    <Box>
                      <Auth dialogOnly={true} activeDialog={openAuthDialog} />
                    </Box>
                  )}

                  <Box display={{ xs: "block", md: "none" }}>
                    <IconButton
                      id="basic-button"
                      aria-controls={
                        Boolean(openState) ? "basic-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={Boolean(openState) ? "true" : undefined}
                      onClick={handleOpen}>
                      <MoreIcon />
                    </IconButton>

                    <Menu
                      id="basic-menu"
                      anchorEl={openState}
                      open={Boolean(openState)}
                      onClose={handleClose}>
                      <MenuItem
                        onClick={() => {
                          setOpenAuthDialog("login");
                        }}>
                        <Link>
                          <Typography color="primary">Login</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setOpenAuthDialog("register");
                        }}>
                        <Link>
                          <Typography color="primary">Register</Typography>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Stack>
              )}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

TopAppBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfile, loadUser, logout })(
  TopAppBar
);
