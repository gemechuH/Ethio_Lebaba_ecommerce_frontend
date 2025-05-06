import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice"; // Import setUser
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../redux/features/auth/authApi";

const Login = () => {
  const [message, setMessage] = useState("");
  const [signState, setSignState] = useState("Log In");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handlesignstate = async (e) => {
    e.preventDefault();
    const data = { userName, email, password };
    try {
      if (signState === "Sign Up") {
        const response = await registerUser(data).unwrap();
        dispatch(setUser({ ...response.user, token: response.token })); // Save to Redux
        navigate("/");
        setSignState("Log In");
      } else {
        const response = await loginUser(data).unwrap();
        dispatch(setUser({ ...response.user, token: response.token })); // Save to Redux
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error); // Log detailed error
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please {signState}</h2>
        <form
          className="space-y-5 max-w-sm mx-auto pt-8"
          onSubmit={handlesignstate}
        >
          {signState === "Sign Up" ? (
            <input
              type="text" // Fixed from "userName"
              placeholder="User Name"
              id="name"
              required
              className="w-full bg-gray-100 focus:outline-none px-5 py-2"
              onChange={(e) => setuserName(e.target.value)}
            />
          ) : null}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            id="email"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-2"
          />
          <div className="mt-2 text-red-400">{message}</div>
          <button
            type="submit"
            disabled={loginLoading || isLoading}
            className="mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-2 rounded-md px-5 w-full disabled:opacity-50"
          >
            {signState}
          </button>
        </form>
        {signState === "Log In" ? (
          <p className="mt-6">
            You don't have an account?{" "}
            <span
              className="text-red-400 cursor-pointer hover:text-red-700"
              onClick={() => setSignState("Sign Up")}
            >
              Create new account
            </span>
          </p>
        ) : (
          <p className="mt-4">
            Have an account?{" "}
            <span
              className="text-red-400 cursor-pointer hover:text-red-700"
              onClick={() => setSignState("Log In")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
