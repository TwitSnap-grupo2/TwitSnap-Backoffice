import * as Yup from "yup";
import logo from "../assets/logo.png";
import { useFormik } from "formik";
import { NewService } from "../types";
import { useState } from "react";
import {
  Alert,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import servicesService from "../services/servicesService";

const AddService = () => {
  const [newServiceError, setNewServiceError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [success, setOpenSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = async (
    values: NewService,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await servicesService.createNewService(values);
      resetForm();
      setOpenSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setNewServiceError(err.message);
        console.error("Error: ", err.message);
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
    setOpenSuccess(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="flex min-h-screen justify-center">
      <div className="rounded-xl shadow-xl px-5 w-2/5 pb-10 mt-32 h-fit">
        <div className="flex flex-col gap-5 text-black">
          <div className="flex justify-center relative">
            <img src={logo} className="w-1/4 h-1/4" />
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            <h2>Create New Service</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col mt-2 gap-8"
          >
            <div className="flex flex-col gap-2">
              <TextField
                id="standard-basic"
                label="Name"
                variant="outlined"
                type="name"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                multiline
                rows={4}
                id="standard-basic"
                name="description"
                label="Description"
                variant="outlined"
                type="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </div>
            {newServiceError && (
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
                  {<p className="text-xl">{newServiceError}</p>}
                </Alert>
              </Snackbar>
            )}
            <Button
              sx={{ bgcolor: "#112334", color: "white", paddingY: "1em" }}
              type="submit"
            >
              {formik.isSubmitting ? "Submitting..." : "Create Service"}
            </Button>{" "}
          </form>
        </div>
      </div>
      {/* <div className="flex justify-center bg-sky-200  w-1/2 min-h-full">
        <img src={icon} className={"min-h-scren"} />
      </div> */}
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {<p className="text-xl">Service registered successfully</p>}
        </Alert>
      </Snackbar>
    </div>
    // </div>
  );
};

export default AddService;
