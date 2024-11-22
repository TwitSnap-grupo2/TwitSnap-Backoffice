import {
  Alert,
  Button,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { UserInfo } from "../types";
import Item from "./Item";
import IndentedComponent from "./IndentedComponent";
import usersService from "../services/usersService";
import { useState } from "react";

interface UserParams {
  user: UserInfo;
  showBlockButton: boolean;
}

const User = ({ user, showBlockButton }: UserParams) => {
  const [userData, setUserData] = useState(user);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [isError, setIsError] = useState(true);

  const onBlock = async () => {
    try {
      setIsTransitioning(true);
      if (userData.is_blocked) {
        await usersService.unBlockUser(userData.id);
        setSnackbarText(`User ${userData.user} unblocked successfully`);
      } else {
        await usersService.blockUser(userData.id);
        setSnackbarText(`User ${userData.user} blocked successfully`);
      }

      setUserData((prev) => ({ ...prev, is_blocked: !prev.is_blocked }));
      setIsError(false);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error: ", err);
      setIsError(true);
      setSnackbarText(
        `Error trying to ${userData.is_blocked ? "unblock" : "block"} user: ${
          userData.user
        }`
      );
      setOpenSnackbar(true);
    }
    setIsTransitioning(false);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarText("");
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Item title="ID" description={user.id}></Item>
      <Item title="Email" description={userData.email}></Item>
      <Item title="User" description={userData.user}></Item>
      <Item title="Name" description={userData.name}></Item>
      {userData.interests && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Interests: </Typography>
          <IndentedComponent>
            {userData.interests.map((interest) => (
              <Typography key={interest}>{interest}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {userData.goals && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Goals: </Typography>
          <IndentedComponent>
            {userData.goals.map((goal) => (
              <Typography key={goal}>{goal}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {userData.followers && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Followers: </Typography>
          <IndentedComponent>
            {userData.followers.map((follower) => (
              <Typography key={follower}>{follower}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {userData.followeds && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Followeds: </Typography>
          <IndentedComponent>
            {userData.followeds.map((followed) => (
              <Typography key={followed}>{followed}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {userData.twitsnaps && (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Twitsnaps: </Typography>
          <IndentedComponent>
            {userData.twitsnaps.map((twitsnap) => (
              <Typography key={twitsnap}>{twitsnap}</Typography>
            ))}
          </IndentedComponent>
        </>
      )}
      {showBlockButton && (
        <>
          <Button
            sx={{
              mt: 1,
              bgcolor: userData.is_blocked ? "#00ff37" : "#ff0011",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => onBlock()}
          >
            {buttonText(userData.is_blocked, isTransitioning)}
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={isError ? "error" : "success"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              <p className="text-xl">{snackbarText}</p>
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

const buttonText = (isBlocked: boolean, isTransitioning: boolean): string => {
  if (isBlocked) {
    if (isTransitioning) {
      return "Unblocking...";
    }
    return "Unblock";
  }
  if (isTransitioning) {
    return "Blocking...";
  }
  return "Block";
};

export default User;
