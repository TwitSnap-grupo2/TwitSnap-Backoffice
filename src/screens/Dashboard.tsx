import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import twitsnapsService from "../services/twitsnapsService";
// import { TwitSnap } from "../types";
import TwitSnaps from "./TwitSnaps";
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showTwits, setShowTwits] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

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
    console.log("🚀 ~ onSeeTwits ~ true:", true);
    setShowTwits(true);
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"See Users"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {showTwits && <TwitSnaps />}
    </>
  );
};

export default Dashboard;
