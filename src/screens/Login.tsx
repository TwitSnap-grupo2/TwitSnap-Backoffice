import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/logo.png";
import closeIcon from "../assets/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";
import { LoginCredentials } from "../types";
import { Button, TextField } from "@mui/material";

interface LoginParams {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (params: LoginParams) => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const onSubmit = async (
    values: LoginCredentials,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Login data:", values);
    try {
      await loginService.login(values);
      resetForm();
      setLoginError("");
      return navigate("/dashboard");
    } catch (err: unknown) {
      console.error("🚀 ~ Login ~ err:", err);
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("An unexpected error occurred.");
      }
    }
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
            <img src={logo} className="w-1/4 h-1/4" alt="Logo" />
            <img
              src={closeIcon}
              className="absolute top-0 right-0 w-6 h-6 cursor-pointer"
              onClick={() => params.setIsLogin(false)}
              alt="Close"
            />
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            <h2>Log in</h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
                name="email"
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

            <Button sx={{ bgcolor: "#112334", color: "white" }} type="submit">
              Login
            </Button>
            {loginError && (
              <div>
                <p className="text-black">{loginError}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
