import * as Yup from "yup";
import logo from "../assets/logo.png";
import closeIcon from "../assets/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { useFormik } from "formik";
import { SignupCredentials } from "../types";
import userService from "../services/loginService";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import {
  Alert,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";

interface Params {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = (params: Params) => {
  const [registerError, setRegisterError] = useState("");
  const [openError, setOpenError] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (
    values: SignupCredentials,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await userService.signup(values);
      resetForm();
      params.setIsRegister(false);
      params.setOpenSuccess(true);
    } catch (err) {
      if (err instanceof FirebaseError) {
        const tokenResponse = err.customData?._tokenResponse as {
          error: { message: string };
        };
        if (tokenResponse?.error.message === "EMAIL_EXISTS") {
          console.error("Firebase error", err.message);
          setRegisterError("Email already exists");
          setOpenError(true);
        }
        if (err instanceof Error) {
          console.error("Error: ", err.message);
        }
      }
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex flex-col gap-5 text-black">
          <div className="flex justify-center relative">
            <img src={logo} className="w-1/4 h-1/4" />
            <img
              src={closeIcon}
              className="absolute top-0 right-0 w-6 h-6 cursor-pointer"
              onClick={() => params.setIsRegister(false)} // Close the modal when clicked
            />
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            <h2>Register</h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                id="standard-basic"
                name="password"
                label="Password"
                variant="standard"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            {registerError && (
              <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {<p className="text-xl">{registerError}</p>}
                </Alert>
              </Snackbar>
            )}
            <Button sx={{ bgcolor: "#112334", color: "white" }} type="submit">
              {formik.isSubmitting ? "Submitting..." : "Register Admin"}
            </Button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
