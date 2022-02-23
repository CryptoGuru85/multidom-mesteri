import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MuiLink from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/actions/auth";
import { getProfile, getProfileList } from "../redux/actions/profile";
import Auth from "./auth";
import Logo from "./Logo";
import Registration from "./registration";

const drawerWidth = 372;

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appBar: {
      border: "0 0 1px 0",
      borderColor: "#DADCE0",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    buttons: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    registerButton: {
      width: "140px",
      height: "42px",
      background: "#2B2322 0% 0% no-repeat padding-box",
      boxShadow: "0px 2px 2px #00000029",
      border: "2px solid #2B2322",
      borderRadius: "4px",
      textAlign: "center",
      font: "normal normal bold 16px/25px Nunito",
      letterSpacing: "0.32px",
      color: "#FFFFFF",
      opacity: 1,

      marginLeft: "12px",

      "&:hover": {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        color: "#2B2322",
      },
    },

    loginButton: {
      width: "150px",
      height: "42px",
      background: "#FFFFFF",
      borderRadius: "2px",
      border: "none",
      opacity: 1,

      textAlign: "center",
      font: "normal normal bold 16px/25px Nunito",
      letterSpacing: "0.32px",
      color: "#606466",

      "&:hover": {
        color: "#2B2322",
      },
    },

    menuIcon: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },

    menuItem: {
      display: "flex",
      flexDirection: "column",
      width: 110,
      backgroundColor: "#FFFFF",
    },

    filter: {
      marginTop: 30,
      marginRight: 15,
      marginLeft: 15,
      "& .filter-label": {
        width: "156px",
        height: "22px",
        textAlign: "left",
        // font: "bold 16px/22px Nunito",
        letterSpacing: "0.32px",
        color: "#2B2322",
        opacity: 1,
      },
    },

    search_top: {
      display: "flex",
      justifyContent: "space-between",
      "& .search-label": {
        width: "156px",
        height: "22px",
        textAlign: "left",
        // font: "bold 16px/22px Nunito",
        letterSpacing: "0.32px",
        color: "#2B2322",
        opacity: 1,
      },
    },

    search: {
      marginBottom: 20,
    },

    filter_input: {
      width: "342px",
      height: "48px",
      background: " #FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: " 0px 2px 2px #0000000D",
      border: "1px solid #BBBCBC",
      borderRadius: "4px",
      opacity: 1,
      marginTop: 15,
      textAlign: "left",
      // font: "bold 16px/22px Nunito",
      letterSpacing: "0.32px",
      color: "#2B2322",
      paddingLeft: 10,
    },
    brand: {
      textAlign: "left",
      // font: "bold 22px/25px Nunito",
      letterSpacing: "0.44px",
      color: "#606466",
      opacity: 1,
      marginLeft: 15,
    },
  };
});

function Header(props) {
  const [profile, setProfile] = useState();
  const [filterInputState, setFilterInputState] = useState({
    searchInput: "",
    locationInput: "",
    entityInput: "",
  });

  const [individualState, setIndividualState] = useState(false);
  const [companyState, setCompanyState] = useState(false);

  const location = useLocation();

  const currentLocation = location.pathname;

  const classes = useStyles();

  const [openState, setOpenState] = useState(null);
  const [openAuthState, setOpenAuthState] = useState(null);

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

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MDrawer = () => (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        style={{ position: "relative", left: 344, width: "23px" }}
        onClick={handleDrawerToggle}>
        <CloseIcon />
      </IconButton>
      <div className={classes.filter}>
        <Toolbar />
        <div className={classes.search}>
          <div className={classes.search_top}>
            <div>
              <Typography className="filter-label">
                Caută dupa serviciu
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#185ABC",
              }}>
              <DisabledByDefaultIcon />
              <Typography className="filter-label">Clear filters</Typography>
            </div>
          </div>
          <input
            className={classes.filter_input}
            onChange={(event) => {
              const newService = event.target.value;
              setFilterInputState((prevFilterState) => ({
                searchInput: newService,
                locationInput: prevFilterState.locationInput,
                entityInput: prevFilterState.entityInput,
              }));
            }}
            placeholder="Montaj acoperiș, reparație acoperiș"
          />
        </div>

        <div>
          <Typography className="filter-label">Location</Typography>

          <InputBase
            className={classes.filter_input}
            fullWidth
            onChange={(event) => {
              const newLocation = event.target.value;
              setFilterInputState((prevFilterState) => ({
                locationInput: newLocation,
                searchInput: prevFilterState.searchInput,
                entityInput: prevFilterState.entityInput,
              }));
            }}
            placeholder="București, Iași, Cluj"
            startAdornment={<LocationOnIcon />}
          />

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          <Typography className="filter-label">Entity</Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "75%",
            }}>
            <FormControlLabel
              control={<Checkbox />}
              checked={companyState}
              onChange={(event) => {
                setCompanyState(!companyState);
                !companyState && setIndividualState(false);
                const newEntity = event.target.value;
                setFilterInputState((prevFilterState) => ({
                  locationInput: prevFilterState.locationInput,
                  searchInput: prevFilterState.searchInput,
                  entityInput: companyState ? "" : newEntity,
                }));
              }}
              value="Company"
              label="Company"
            />
            <FormControlLabel
              control={<Checkbox />}
              checked={individualState}
              onChange={(event) => {
                setIndividualState(!individualState);
                !individualState && setCompanyState(false);
                const newEntity = event.target.value;
                setFilterInputState((prevFilterState) => ({
                  locationInput: prevFilterState.locationInput,
                  searchInput: prevFilterState.searchInput,
                  entityInput: individualState ? "" : newEntity,
                }));
              }}
              value="Individual"
              label="Person"
            />
          </div>
        </div>

        <Button
          sx={{ display: { sm: "none" } }}
          variant="contained"
          style={{
            background: "#2B2322 0% 0% no-repeat padding-box",
            boxShadow: "0px 2px 2px #00000029",
            border: "2px solid #2B2322",
            borderRadius: "4px",
            textAlign: "center",
            // font: "normal normal bold 16px/25px Nunito",
            letterSpacing: "0.32px",
            color: "#FFFFFF",
            opacity: 1,
          }}
          fullWidth
          onClick={handleDrawerToggle}>
          Filtrează
        </Button>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    props.getProfileList(filterInputState);
    props.user && props.getProfile(props.user.id);
    props.profile && setProfile(props.profile);
  }, [props.user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar sx={{ zIndex: { sm: 20000 } }} position="fixed" color="inherit">
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Logo />
            <div className={classes.brand}>Meșteri</div>
          </Link>
          {props.isAuthenticated ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAuthOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                style={{ zIndex: 20001 }}
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
                <MenuItem onClick={handleAuthClose}>Profile</MenuItem>
                <MenuItem onClick={props.logout}>Logout</MenuItem>
              </Menu>
              {profile && profile.is_owner && (
                <Registration
                  userId={props.user.id}
                  profile={profile}
                  setProfile={setProfile}
                />
              )}
            </div>
          ) : (
            <>
              <div className={classes.buttons}>
                <Auth />
              </div>
              <div className={classes.menuIcon}>
                <IconButton onClick={handleOpen}>
                  <MoreIcon />
                </IconButton>

                <Menu
                  anchorEl={openState}
                  open={Boolean(openState)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      left: "50%",
                      transform: "translateX(-30%) translateY(75%)",
                    },
                  }}
                  MenuListProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  style={{ zIndex: 20001 }}>
                  <MenuItem className={classes.menuItem}>
                    <MuiLink
                      component={Link}
                      to="/login"
                      color="inherit"
                      onClick={handleClose}>
                      Login
                    </MuiLink>

                    <MuiLink
                      component={Link}
                      to="/login"
                      color="inherit"
                      onClick={handleClose}>
                      Register
                    </MuiLink>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {currentLocation === "/" && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            <MDrawer />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open>
            <MDrawer />
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <div
          style={{
            textAlign: "right",
          }}>
          <Button
            sx={{ display: { sm: "none" } }}
            variant="text"
            style={
              {
                // font: "normal normal bold 16px/25px Nunito",
              }
            }
            onClick={handleDrawerToggle}>
            Filtrează
          </Button>
        </div>
        {props.children}
      </Box>
    </Box>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile_list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,

  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile_list: state.profile.profile_list,
  loading: state.profile.loading,
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getProfileList, logout, getProfile })(
  Header
);
