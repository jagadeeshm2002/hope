import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { Button } from "@material-tailwind/react";
import loginImage from "../../assets/outline-mobile-login-via-phone-device.png";

export default function Login() {
  const initialState ={ email: "", password: "" }
  const [formValue, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validator(formValue));
    setIsSubmit(true);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
     try {
      const {email,password}= formValue
      const userData = await login({ email,password }).unwrap();
      
      dispatch(setCredentials({ ...userData,user:email}));
      setFormValue(initialState)
      navigate("/welcome");
    } catch (err) {
      console.log(err)
      if (err?.originalStatus?.status === 400) {
        setErrorMessage("Missing email or password");
      } else if (err.originalStatus?.status === 401) {
        setErrorMessage("Unauthorized");
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

  useEffect(() => {
    
  }, [formErrors, formValue, isSubmit, errorMessage]);

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
    } else if (values.password.length < 8 ) {
      errors.password ="password must contain 8 characters";
    }

    return errors;
  };

  return (
    <>
      <div className="flex w-[100%] justify-center items-center ">
        <div className="max-w-screen-lg">
          <div className="flex flex-col  md:flex-row gap-4  p-10 px-14">
            <div className="flex-auto w-52 md:w-full justify-self-start mx-10">
              <img
                src={loginImage}
                alt="outline-mobile-login-via-phone-device"
                aria-label="outline-mobile-login-via-phone-device"
              />
            </div>
            <div className="m-10 flex flex-col justify-center md:w-full">
              <form onSubmit={handleSubmit}>
                <p className="font-sans mb-5 font-semibold">LOGIN</p>
                <div className="flex flex-col items-start">
                <p className={`text-red-700 text-sm ${errorMessage !== "" ? "block" : "hidden"}`}>{errorMessage}</p>
                  <div className="flex flex-col items-start w-full mb-3">
                    <label htmlFor="email">
                      Email<span className="text-red-700">*</span>
                    </label>
                    <input
                      id="email"
                      placeholder="joe@email.com"
                      type="text"
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
                    />
                  <p className="text-red-700 text-sm ">{formErrors.password}</p>
                  </div>
                </div>
                <Link to={"#"} className="m-0 flex justify-end text-blue-700 hover:text-blue-900 gap-0 text-sm mt-2">
                  Forgot Password?
                </Link>
                <Button type="submit" title="jaga" className="my-1 w-[100%]" disabled={!formValue.email || !formValue.password} >
                  Login
                </Button>
              </form>
              
              <Link to={"/register"} className="hover:text-gray-800 mt-6">Create An Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
