import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import twitsnapsService from "../services/twitsnapsService";
// import { TwitSnap } from "../types";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import PeopleIcon from "@mui/icons-material/People";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Outlet } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FindInPageIcon from "@mui/icons-material/FindInPage";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  // const [openSuccess, setOpenSuccess] = useState(false);

  // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
  useEffect(() => {
    // If authStateReady is not checked, the user sets to null as initial value, leading to unwanted behaviour
    auth.authStateReady().then(() => {
      const user = auth.currentUser;
      if (!user) {
        <h1>Hello</h1>;
        return navigate("/");
      }
    });
  });

  const onLogOut = async () => {
    console.log("Logging out...");
    await auth.signOut();
    return navigate("/");
  };

  const onSeeTwits = () => {
    navigate("/dashboard/twits");
  };
  const onSeeUsers = () => {
    navigate("/dashboard/users");
  };

  const onRegisterAdmin = () => {
    navigate("/dashboard/register");
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "ffffff" }}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TwitSnap Administration
            </Typography>
            <Button color="inherit" onClick={onLogOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
        >
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <p className="mt-4 mb-2 font-bold text-xl text-center">Menu</p>
              </ListSubheader>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onSeeTwits();
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary={"See Twits"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onSeeUsers();
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"See Users"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onRegisterAdmin();
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText primary={"Register Admin"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/dashboard/metrics");
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary={"Metrics"} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding> */}
            <ListItemButton
              onClick={() => {
                setOpenServices(!openServices);
              }}
            >
              <ListItemIcon>
                <MiscellaneousServicesIcon />
              </ListItemIcon>
              <ListItemText primary={"Services"} />
              {openServices ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openServices} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setOpenServices(!openServices);
                    setOpenDrawer(false);
                    navigate("/dashboard/services/add");
                  }}
                >
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Service" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setOpenServices(!openServices);
                    setOpenDrawer(false);
                    navigate("/dashboard/services/info");
                  }}
                >
                  <ListItemIcon>
                    <FindInPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="See Services" />
                </ListItemButton>
              </List>
            </Collapse>
            {/* </ListItem> */}
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
