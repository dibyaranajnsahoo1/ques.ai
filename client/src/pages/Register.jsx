import React, { useEffect, useState } from "react";
import CustomQLogo from "../components/UI/Qlogo";
import {
  useLoginMutation,
  useMyInfoQuery,
  useSignupMutation,
} from "../redux/service";
import { toast } from "sonner";
import maskGroup from '../assets/Mask group.png';
import QuesLogo from '../assets/logo.png';

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
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, userName, password };
    try {
      await signupUser(data).unwrap();
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const handleGoogleLogin = () => {

    toast('Google login clicked - Not work so try with email and password'); 
  };

  useEffect(() => {
    if (signupUserData.isSuccess) {
      toast.success(signupUserData.data?.msg || "Registration successful");
      refetch();
    }
    if (signupUserData.isError) {
      toast.error(signupUserData.error?.data?.msg || "Registration failed");
    }
  }, [signupUserData.isSuccess, signupUserData.isError, refetch, signupUserData.data, signupUserData.error]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data?.msg || "Login successful");
      refetch();
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error?.data?.msg || "Login failed");
    }
  }, [loginUserData.isSuccess, loginUserData.isError, refetch, loginUserData.data, loginUserData.error]);

  return (
    <div className="w-full flex font-roboto">
      {/* landing page section */}
      <div
        className="leftsideBanner h-[100vh] w-[70vw] bg-cover shadow p-20 bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom left, #c854ff, #3a0b63), url(${maskGroup})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div>
          <div
            className="headingLogo w-[270px] h-[58px]"
            style={{ backgroundImage: `url(${QuesLogo})` }}
          />
          <div className="heroText mt-10">
            <p className="w-[30vw] text-white font-normal text-[8vh]">
              Your podcast
            </p>
            <p className="w-[30vw] text-white font-normal text-[8vh] -translate-y-[25%]">
              will no longer
            </p>
            <p className="text-white font-normal text-[8vh] -translate-y-[50%]">
              be just a hobby.
            </p>
          </div>
          <div>
            <p className="text-white font-normal w-[25vw] text-[4vh]">
              Supercharge Your Distribution using our AI assistant!
            </p>
          </div>
        </div>
      </div>

      {/* Signup / login section */}
      <div className="min-h-screen w-[32%] bg-[#f5f6fa] flex flex-col justify-center ">
        <div className="flex justify-center mb-6">
          <CustomQLogo stroke="#7e22ce" width={80} height={80} />
        </div>

        <div className="py-4 px-4 sm:rounded-lg sm:px-10">
          <div className="mb-6 flex flex-col items-center justify-center">
            <h2 className="text-center text-3xl font-normal text-[#7e22ce]">
              Welcome to
            </h2>
            <h2 className="text-center text-[1.68rem] font-bold text-[#7e22ce]">
              Ques.AI
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form
              className="space-y-6"
              onSubmit={toggle ? handleRegister : handleLogin}
            >
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {toggle && (
                <div>
                  <input
                    id="username"
                    name="userName"
                    type="text"
                    placeholder="Username"
                    required
                    className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember me and Forgot password */}
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
                  onClick={() => toast('Redirect to forgot password page')}
                  className="text-sm text-blue-600 hover:text-indigo-600"
                >
                  Forgot password?
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7e22ce] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {toggle ? "Sign up" : "Login"}
                </button>
              </div>
            </form>

            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                         <p className="mx-4 text-gray-500 whitespace-nowrap">or</p>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>



            {/* Continue with Google Button */}
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {toggle ? "Already have an account?" : "Don't have an account?"}{" "}
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
    </div>
  );
};

export default Register;




// import React, { useEffect, useState } from "react";
// import CustomQLogo from "../components/UI/Qlogo";
// import {
//   useLoginMutation,
//   useMyInfoQuery,
//   useSignupMutation,
// } from "../redux/service";
// import { toast } from "sonner";
// import maskGroup from '../assets/Mask group.png';
// import QuesLogo from '../assets/logo.png';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';

// const Register = () => {
//   const [toggle, setToggle] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const [signupUser, signupUserData] = useSignupMutation();
//   const [loginUser, loginUserData] = useLoginMutation();
//   const { refetch } = useMyInfoQuery();

//   const handleToggle = () => {
//     setToggle((prev) => !prev);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const data = { email, password, rememberMe };
//     try {
//       await loginUser(data).unwrap();
//     } catch (error) {
//       // Error handled in useEffect
//     }
//   };

//     const handleRegister = async (e) => {
//     e.preventDefault();
//     const data = { email, userName, password };
//     try {
//       await signupUser(data).unwrap();
//     } catch (error) {
//       // Error handled in useEffect
//     }
//   };


//   // Handle Google login success callback
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const googleToken = credentialResponse.credential;
      
   
//       await loginUser({ googleToken }).unwrap();

//       toast.success("Google login successful");
//       refetch();
//     } catch (error) {
//       toast.error("Google login failed");
//     }
//   };

//   // Handle Google login failure callback
//   const handleGoogleFailure = () => {
//     toast.error("Google login failed or cancelled");
//   };

//   useEffect(() => {
//     if (signupUserData.isSuccess) {
//       toast.success(signupUserData.data?.msg || "Registration successful");
//       refetch();
//     }
//     if (signupUserData.isError) {
//       toast.error(signupUserData.error?.data?.msg || "Registration failed");
//     }
//   }, [signupUserData.isSuccess, signupUserData.isError, refetch, signupUserData.data, signupUserData.error]);

//   useEffect(() => {
//     if (loginUserData.isSuccess) {
//       toast.success(loginUserData.data?.msg || "Login successful");
//       refetch();
//     }
//     if (loginUserData.isError) {
//       toast.error(loginUserData.error?.data?.msg || "Login failed");
//     }
//   }, [loginUserData.isSuccess, loginUserData.isError, refetch, loginUserData.data, loginUserData.error]);

//   return (
//     <div className="w-full flex font-roboto">
//       {/* landing page section */}
//       <div
//         className="leftsideBanner h-[100vh] w-[70vw] bg-cover shadow p-20 bg-center"
//         style={{
//           backgroundImage: `linear-gradient(to bottom left, #c854ff, #3a0b63), url(${maskGroup})`,
//           backgroundBlendMode: "overlay",
//         }}
//       >
//         <div>
//           <div
//             className="headingLogo w-[270px] h-[58px]"
//             style={{ backgroundImage: `url(${QuesLogo})` }}
//           />
//           <div className="heroText mt-10">
//             <p className="w-[30vw] text-white font-normal text-[8vh]">
//               Your podcast
//             </p>
//             <p className="w-[30vw] text-white font-normal text-[8vh] -translate-y-[25%]">
//               will no longer
//             </p>
//             <p className="text-white font-normal text-[8vh] -translate-y-[50%]">
//               be just a hobby.
//             </p>
//           </div>
//           <div>
//             <p className="text-white font-normal w-[25vw] text-[4vh]">
//               Supercharge Your Distribution using our AI assistant!
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Signup / login section */}
//       <div className="min-h-screen w-[32%] bg-[#f5f6fa] flex flex-col justify-center ">
//         <div className="flex justify-center mb-6">
//           <CustomQLogo stroke="#7e22ce" width={80} height={80} />
//         </div>

//         <div className="py-4 px-4 sm:rounded-lg sm:px-10">
//           <div className="mb-6 flex flex-col items-center justify-center">
//             <h2 className="text-center text-3xl font-normal text-[#7e22ce]">
//               Welcome to
//             </h2>
//             <h2 className="text-center text-[1.68rem] font-bold text-[#7e22ce]">
//               Ques.AI
//             </h2>
//           </div>

//           <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//             <form
//               className="space-y-6"
//               onSubmit={toggle ? handleRegister : handleLogin}
//             >
//               <div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Email Address"
//                   autoComplete="email"
//                   required
//                   className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               {toggle && (
//                 <div>
//                   <input
//                     id="username"
//                     name="userName"
//                     type="text"
//                     placeholder="Username"
//                     required
//                     className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                   />
//                 </div>
//               )}

//               <div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   autoComplete="current-password"
//                   required
//                   className="appearance-none block w-full px-3 py-[10px] border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               {/* Remember me and Forgot password */}
//               <div className="flex justify-between items-center mt-2">
//                 <label className="inline-flex items-center text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                   />
//                   <span className="ml-2 select-none">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => toast('Redirect to forgot password page')}
//                   className="text-sm text-blue-600 hover:text-indigo-600"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7e22ce] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   {toggle ? "Sign up" : "Login"}
//                 </button>
//               </div>
//             </form>

//             <div className="flex items-center my-4">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <p className="mx-4 text-gray-500 whitespace-nowrap">or</p>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>

//             {/* Continue with Google Button */}
//            <div className="mt-4 flex justify-center">
//             <div className="w-full">
//                 <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={handleGoogleFailure}
//                 useOneTap
//                 theme="outline"
//                 size="large"
//                 width="100%"
//                 />
//             </div>
//             </div>
 

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 {toggle ? "Already have an account?" : "Don't have an account?"}{" "}
//                 <button
//                   className="font-medium text-[#005ad5] hover:text-indigo-500"
//                   onClick={handleToggle}
//                 >
//                   {toggle ? "Login" : "Create Account"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
