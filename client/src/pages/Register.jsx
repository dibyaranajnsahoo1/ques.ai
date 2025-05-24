
import React, { useEffect, useState } from "react";
import CustomQLogo from "../components/UI/Qlogo";
import {
  useLoginMutation,
  useMyInfoQuery,
  useSignupMutation,
} from "../redux/service";
import { toast } from "sonner";
import maskGroup from "../assets/Mask group.png";
import QuesLogo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [signupUser, signupUserData] = useSignupMutation();
  const [loginUser, loginUserData] = useLoginMutation();
  const { refetch } = useMyInfoQuery();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password, rememberMe };
    try {
      await loginUser(data).unwrap();
    } catch (error) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, userName, password };
    try {
      await signupUser(data).unwrap();
    } catch (error) {}
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      await loginUser({ googleToken }).unwrap();
      toast.success("Google login successful");
      refetch();
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed or cancelled");
  };

  useEffect(() => {
    if (signupUserData.isSuccess) {
      toast.success(signupUserData.data?.msg || "Registration successful");
      refetch();
    }
    if (signupUserData.isError) {
      toast.error(signupUserData.error?.data?.msg || "Registration failed");
    }
  }, [
    signupUserData.isSuccess,
    signupUserData.isError,
    refetch,
    signupUserData.data,
    signupUserData.error,
  ]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data?.msg || "Login successful");
      refetch();
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error?.data?.msg || "Login failed");
    }
  }, [
    loginUserData.isSuccess,
    loginUserData.isError,
    refetch,
    loginUserData.data,
    loginUserData.error,
  ]);

  return (
      <div className="w-full flex flex-col md:flex-row font-roboto">
            {/* Left Section */}
            <div
              className="leftsideBanner h-[50vh] md:h-screen w-full md:w-[70vw] bg-cover shadow p-6 md:p-20 bg-center flex items-center justify-center md:block"
              style={{
                backgroundImage: `linear-gradient(to bottom left, #c854ff, #3a0b63), url(${maskGroup})`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div>
                <div
                  className="headingLogo w-[180px] h-[40px] md:w-[270px] md:h-[58px] bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url(${QuesLogo})` }}
                />
                <div className="heroText mt-6 md:mt-10">
                  <p className="text-white text-[5vw] md:text-[8vh] font-normal">
                    Your podcast
                  </p>
                  <p className="text-white text-[5vw] md:text-[8vh] font-normal -translate-y-[10%] md:-translate-y-[25%]">
                    will no longer
                  </p>
                  <p className="text-white text-[5vw] md:text-[8vh] font-normal -translate-y-[20%] md:-translate-y-[50%]">
                    be just a hobby.
                  </p>
                </div>
                <p className="text-white mt-4 text-[3.5vw] md:text-[4vh] w-[80vw] md:w-[25vw] font-normal">
                  Supercharge Your Distribution using our AI assistant!
                </p>
              </div>
            </div>

      {/* Right Side Form */}
      <div className="w-full md:w-[32%] bg-[#f5f6fa] flex flex-col justify-center items-center px-4 py-10 md:py-0">
        <div className="flex justify-center mb-6">
          <CustomQLogo stroke="#7e22ce" width={80} height={80} />
        </div>

        <div className="w-full sm:max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-normal text-[#7e22ce]">Welcome to</h2>
            <h2 className="text-[1.68rem] font-bold text-[#7e22ce]">Ques.AI</h2>
          </div>

          <form
            className="space-y-6"
            onSubmit={toggle ? handleRegister : handleLogin}
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              required
              className="w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {toggle && (
              <input
                id="username"
                name="userName"
                type="text"
                placeholder="Username"
                required
                className="w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between items-center mt-2">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 select-none">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => toast("Redirect to forgot password page")}
                className="text-sm text-blue-600 hover:text-indigo-600"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7e22ce] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {toggle ? "Sign up" : "Login"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="mx-4 text-gray-500 whitespace-nowrap">or</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
         

         <div className="mt-4 flex justify-center">
             <div className="w-full">
                <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                 theme="outline"
                size="large"
                width="100%"
                />
            </div>
        </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {toggle
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                className="font-medium text-[#005ad5] hover:text-indigo-500"
                onClick={handleToggle}
              >
                {toggle ? "Login" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
