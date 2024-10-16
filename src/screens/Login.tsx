import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../assets/logo.png";
import closeIcon from "../assets/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/userService";
import { LoginCredentials } from "../types";

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
      // login(values);
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
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-200 rounded-md px-4 py-3 placeholder-gray-600 w-full"
                  />
                  <div className="min-h-[1.5rem]">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-200 rounded-md px-4 py-3 placeholder-gray-600 w-full"
                  />
                  <div className="min-h-[1.5rem]">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-3 mt-4 rounded-md hover:bg-blue-600"
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </button>
                {loginError && (
                  <div>
                    <p className="text-black">{loginError}</p>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;