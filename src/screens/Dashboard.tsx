import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import twitsnapsService from "../services/twitsnapsService";
// import { TwitSnap } from "../types";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import PeopleIcon from "@mui/icons-material/People";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
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
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={onSeeTwits}>
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary={"See Twits"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onSeeUsers}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"See Users"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onRegisterAdmin}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"Register Admin"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/dashboard/metrics");
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"Metrics"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
