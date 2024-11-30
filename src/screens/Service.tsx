import {
  Alert,
  Button,
  Card,
  CardContent,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { Service as ServiceType } from "../types";
import { useState } from "react";
import servicesService from "../services/servicesService";

interface ServiceProps {
  service: ServiceType;
}

const Service = ({ service }: ServiceProps) => {
  const [serviceData, setServieData] = useState(service);
  const [isValid, setIsValid] = useState(
    new Date(serviceData.validUntil) > new Date()
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [isError, setIsError] = useState(true);

  const onBlock = async () => {
    try {
      setIsTransitioning(true);
      if (!isValid) {
        const a = await servicesService.unblockService(serviceData.id);
        console.log("🚀 ~ onBlock ~ a:", a);
        setSnackbarText(`Service ${serviceData.name} unblocked successfully`);
      } else {
        const a = await servicesService.blockService(serviceData.id);
        console.log("🚀 ~ onBlock ~ a:", a);
        setSnackbarText(`Service ${serviceData.name} blocked successfully`);
      }

      //   setServieData((prev) => ({ ...prev, is_blocked: !prev.is_blocked }));
      setIsValid(!isValid);
      setIsError(false);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error: ", err);
      setIsError(true);
      setSnackbarText(
        `Error trying to ${isValid ? "unblock" : "block"} user: ${
          serviceData.name
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
      <Card sx={{ minWidth: 380, maxWidth: 385 }}>
        <CardContent key={service.id}>
          <h2 className="font-semibold">{service.name}</h2>
          <p>id: {service.id}</p>
          <p>description: {service.description}</p>
          <p>createdAt: {new Date(service.createdAt).toISOString()}</p>
          <p>apiKey: {service.apiKey}</p>
          <p>validUntil: {new Date(service.validUntil).toISOString()}</p>
          <Button
            sx={{
              mt: 1,
              bgcolor: isValid ? "#ff0011" : "#00ff37",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => onBlock()}
          >
            {buttonText(isValid, isTransitioning)}
          </Button>
        </CardContent>
      </Card>
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

const buttonText = (isValid: boolean, isTransitioning: boolean) => {
  if (!isValid) {
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

export default Service;
