import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import twitsnapsService from "../services/twitsnapsService";
// import { TwitSnap } from "../types";
import TwitSnaps from "./TwitSnaps";
import {
  Alert,
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
  Snackbar,
  SnackbarCloseReason,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import PeopleIcon from "@mui/icons-material/People";
import Users from "./Users";
import Register from "./Register";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showTwits, setShowTwits] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

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

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const onLogOut = async () => {
    console.log("Logging out...");
    await auth.signOut();
    return navigate("/");
  };

  const onSeeTwits = () => {
    setShowUsers(false);
    setShowTwits(true);
    setShowRegister(false);
  };
  const onSeeUsers = () => {
    setShowTwits(false);
    setShowUsers(true);
    setShowRegister(false);
  };

  const onRegisterAdmin = () => {
    setShowTwits(false);
    setShowUsers(false);
    setShowRegister(true);
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
          </List>
        </Box>
      </Drawer>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {<p className="text-xl">Admin registered successfully</p>}
        </Alert>
      </Snackbar>
      {showTwits && <TwitSnaps />}
      {showUsers && <Users />}
      {showRegister && (
        <Register
          setIsRegister={setShowRegister}
          setOpenSuccess={setOpenSuccess}
        />
      )}
    </Box>
  );
};

export default Dashboard;
