import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { Button, Input } from "@material-tailwind/react";
import loginImage from "../../assets/outline-mobile-login-via-phone-device.png"

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const errorMsgRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { userData } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (err?.originalStatus?.status === 400) {
        setErrorMessage("Missing email or password");
      } else if (err.originalStatus?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <>
      <div className="flex w-[100%] justify-center items-center my-14">
        <div className="max-w-screen-lg ">
          <div className="flex flex-row  gap-4 border rounded-2xl p-10 px-14">
            <div className="flex-auto justify-self-start mx-10">
              <img src={loginImage} alt="outline-mobile-login-via-phone-device" aria-label="outline-mobile-login-via-phone-device"/>
            </div>
            <div className=" m-10 flex flex-col  justify-center w-60 ">
              <p className="font-sans mb-5 font-semibold ">LOGIN</p>
              <div className=" flex flex-col items-start">
                <label htmlFor="email " > Email <span className="text-red-500">*</span></label>

                <input
                  type="email"
                  placeholder="james@email.com"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  ref={emailInputRef}
                  className="p-2 px-3 rounded-md border border-gray-400"
                  
                />
                
                <label htmlFor="password" >Password<span className="text-red-500">*</span></label>
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                  minLength={8}
                  autoComplete="current-password"

                  className="p-2 px-3 rounded-md border border-gray-400"
                />
                
              </div>
              <Link to={"#"} className="m-0 flex justify-end text-blue-700 hover:text-blue-900 gap-0 text-sm mt-2">Forgot Password?</Link>
              <Button
                type="submit"
                title="jaga"
                className="my-1"
                disabled={email && password !== "" ? false : true}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p className={`text-red-700 text-sm ${errorMessage !== "" ? "block" : "hidden"}`} ref={errorMsgRef}>
                * {errorMessage}
              </p>
              <Link to={"/register"} className="hover:text-gray-800 mt-6">Create An Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

