import * as Yup from "yup";
import logo from "../assets/logo.png";
import closeIcon from "../assets/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormValues {
  user: string;
  username: string;
  email: string;
  password: string;
}

interface Params {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = (params: Params) => {
  const validationSchema = Yup.object({
    user: Yup.string().required("User is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form data:", values);
    resetForm();
  };

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
          <Formik
            initialValues={{ user: "", username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Field
                    type="text"
                    name="user"
                    placeholder="User"
                    className="bg-gray-200 rounded-md px-4 py-3 placeholder-gray-600 w-full"
                  />
                  <div className="min-h-[1.5rem]">
                    <ErrorMessage
                      name="user"
                      component="div"
                      className="text-red-500 text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="bg-gray-200 rounded-md px-4 py-3 placeholder-gray-600 w-full"
                  />
                  <div className="min-h-[1.5rem]">
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-base"
                    />
                  </div>
                </div>

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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
