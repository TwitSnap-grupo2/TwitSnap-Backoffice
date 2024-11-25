import {
  Alert,
  Button,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { TwitSnap } from "../types";
import IndentedComponent from "./IndentedComponent";
import User from "./User";
import Item from "./Item";
import { useState } from "react";
import twitsnapsService from "../services/twitsnapsService";

interface TwitParams {
  twit: TwitSnap;
}

const Twit = ({ twit }: TwitParams) => {
  const [twitData, setTwitData] = useState(twit);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [isError, setIsError] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const onBlock = async () => {
    try {
      setIsTransitioning(true);
      let res;
      if (twitData.isBlocked) {
        res = await twitsnapsService.unblockTwit(twitData.id);
        setSnackbarText(`Twit ${twitData.message} unblocked successfully`);
      } else {
        res = await twitsnapsService.blockTwit(twitData.id);
        setSnackbarText(`Twit ${twitData.message} blocked successfully`);
      }
      setTwitData(res);
      setIsError(false);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error: ", err);
      setIsError(true);
      setSnackbarText(
        `Error trying to ${twitData.isBlocked ? "unblock" : "block"} twit: ${
          twit.message
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
    <>
      <Typography sx={{ fontWeight: "bold" }}>Created by:</Typography>
      <IndentedComponent>
        <User showBlockButton={false} user={twit.createdBy}></User>
      </IndentedComponent>
      <Item title="Created at" description={twit.createdAt.toISOString()} />
      <Item title="ID" description={twit.id} />

      <Button
        sx={{
          mt: 1,
          bgcolor: twitData.isBlocked ? "#00ff37" : "#ff0011",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={() => onBlock()}
      >
        {buttonText(twitData.isBlocked, isTransitioning)}
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

export default Twit;
