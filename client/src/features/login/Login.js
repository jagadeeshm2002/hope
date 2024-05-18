import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { Button } from "@material-tailwind/react";
import loginImage from "../../assets/outline-mobile-login-via-phone-device.png";

export default function Login({ type }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    const pageTitle = type === "register" ? "Register" : "Login";

    document.title = pageTitle;

    if (isAuthenticated && type === "register") {
      navigate("/");
    } else if (isAuthenticated && type === "login") {
      navigate("/");
    }
  }, [type, navigate]);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="max-w-screen-lg">
        <div className="flex flex-col md:flex-row gap-4 p-10 px-14">
          <div className="flex h-full w-52 md:w-full justify-self-center self-center  mx-10">
            <img
              src={loginImage}
              alt="outline-mobile-login-via-phone-device"
              aria-label="outline-mobile-login-via-phone-device"
            />
          </div>
          <div className="m-10 flex flex-col justify-center md:w-full">
            {type === "login" ? <LoginForm /> : <RegisterForm />}
            {type === "login" ? (
              <Link to="/register" className="hover:text-gray-800 mt-6">
                Create An Account
              </Link>
            ) : (
              <Link to="/login" className="hover:text-gray-800 mt-6">
                Already Have An Account?
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const LoginForm = () => {
  const initialState = { email: "", password: "" };
  const [formValue, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(formValue);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const { email, password } = formValue;
        const userData = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...userData, user: email }));
        const { message } = userData;
        setSuccess(message);
        setFormValue(initialState);
        setTimeout(() => navigate(-1), 2000);
        
      } catch (err) {
        console.log(err);
        if (err?.status === 400) {
          setErrorMessage("Missing email or password");
        } else if (err?.status === 401) {
          setErrorMessage(err?.data?.error);
        } else {
          setErrorMessage("Login failed");
        }
      }
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validator = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-sans mb-5 font-semibold">LOGIN</p>
      <div className="flex flex-col items-start">
        <p
          className={`text-red-700 text-sm my-2 ${
            errorMessage ? "block" : "hidden"
          }`}
        >
          {errorMessage}
        </p>
        <p
          className={`text-green-500 text-sm text-center ${
            success ? "block" : "hidden"
          }`}
        >
          {success}
        </p>
        <div className="flex flex-col items-start w-full mb-3">
          <label htmlFor="email">
            Email<span className="text-red-700">*</span>
          </label>
          <input
            id="email"
            placeholder="joe@email.com"
            type="email"
            value={formValue.email}
            name="email"
            onChange={onChangeHandler}
            className="border rounded-sm p-2 w-full"
            
          />
          <p className="text-red-700 text-sm ml-1">{formErrors.email}</p>
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="password">
            Password<span className="text-red-700">*</span>
          </label>
          <input
            id="password"
            placeholder="********"
            type="password"
            value={formValue.password}
            name="password"
            onChange={onChangeHandler}
            className="border rounded-sm p-2 w-full"
            autoComplete="new-password"
          />
          <p className="text-red-700 text-sm">{formErrors.password}</p>
        </div>
      </div>
      <Link
        to="#"
        className="m-0 flex justify-end text-blue-700 hover:text-blue-900 text-sm mt-2"
      >
        Forgot Password?
      </Link>
      <Button
        type="submit"
        className="my-1 w-full"
        disabled={!formValue.email || !formValue.password || isLoading}
      >
        Login
      </Button>
    </form>
  );
};

export const RegisterForm = () => {
  const initialState = { name: "", email: "", password: "" };
  const [formValue, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(formValue);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const { name, email, password } = formValue;
        const { message } = await register({ name, email, password }).unwrap();
        setSuccess(message);

        setFormValue(initialState);
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        if (err?.originalStatus?.status === 400) {
          setErrorMessage("All fields are required");
        } else if (err.originalStatus?.status === 409) {
          setErrorMessage("User already exists");
        } else {
          setErrorMessage("Registration failed");
        }
      }
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validator = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <p className="font-sans mb-5 font-semibold">REGISTER</p>
      <div className="flex flex-col items-start">
        <p
          className={`text-red-700 text-sm text-center ${
            errorMessage ? "block" : "hidden"
          }`}
        >
          {errorMessage}
        </p>
        <p
          className={`text-green-500 text-sm text-center ${
            success ? "block" : "hidden"
          }`}
        >
          {success}
        </p>
        <div className="flex flex-col items-start w-full mb-3">
          <label htmlFor="name">
            Name<span className="text-red-700">*</span>
          </label>
          <input
            id="name"
            placeholder="joe don"
            type="text"
            value={formValue.name}
            name="name"
            onChange={onChangeHandler}
            className="border rounded-sm p-2 w-full"
            autoComplete="nope"
          />
          <p className="text-red-700 text-sm ml-1">{formErrors.name}</p>
        </div>
        <div className="flex flex-col items-start w-full mb-3">
          <label htmlFor="email">
            Email<span className="text-red-700">*</span>
          </label>
          <input
            id="email"
            placeholder="joe@email.com"
            type="email"
            value={formValue.email}
            name="email"
            onChange={onChangeHandler}
            className="border rounded-sm p-2 w-full -webkit-appearance-none appearance-none"
            autoComplete="nope"
          />
          <p className="text-red-700 text-sm ml-1">{formErrors.email}</p>
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="password">
            Password<span className="text-red-700">*</span>
          </label>
          <input
            id="password"
            placeholder="********"
            type="password"
            value={formValue.password}
            name="password"
            onChange={onChangeHandler}
            className="border rounded-sm p-2 w-full appearance-none -webkit-appearance-none"
            autoComplete="new-password"
          />
          <p className="text-red-700 text-sm">{formErrors.password}</p>
        </div>
      </div>

      <Button
        type="submit"
        className="my-1 w-full mt-4"
        disabled={!formValue.email || !formValue.password || isLoading}
      >
        Register
      </Button>
    </form>
  );
};
