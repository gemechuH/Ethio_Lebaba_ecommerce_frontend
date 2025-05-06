import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // for Api login and sign up

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      userName,
      email,
      password,
    };
    // console.log(data);
    try {
      await registerUser(data).unwrap();
      // console.log(res)

    //   alert("register succesfully");
      navigate("/");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please register</h2>

        <form
          className="space-y-5 max-w-sm mx-auto pt-8"
          onSubmit={handleRegister}
        >
          <input
            type="userName"
            placeholder="userName"
            id="name"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-2"
            onChange={(e) => setUserName(e.target.value)}
          />

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
            className="mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-2 rounded-md px-5 w-full"
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center text-red">
          Don't have an account?{" "}
          <Link to="/login" className="text-red-400">
            Login
          </Link>{" "}
          here
        </p>
      </div>
    </section>
  );
};

export default Register;
