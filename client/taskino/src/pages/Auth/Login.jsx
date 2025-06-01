import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { assets } from "../../assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };



  return (
    <AuthLayout>
      <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto min-h-[80vh] flex flex-col justify-center px-6 py-10 bg-white rounded-lg shadow-lg">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-20 sm:w-24 mx-auto mb-8"
        />
        <h3 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Welcome Back
        </h3>
        <p className="text-gray-600 mb-8 text-center">
          Please enter your details to log in
        </p>

        <button
          onClick={() => handleDemoLogin("admin")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-2 w-full"
        >
          Demo Admin Login
        </button>

        <button
          onClick={() => handleDemoLogin("member")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 w-full"
        >
          Demo Member Login
        </button>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            className="border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-amber-400 focus:border-amber-400"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            className="border border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-amber-400 focus:border-amber-400"
          />

          {error && (
            <p className="text-red-500 text-sm font-semibold -mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-800 text-white text-lg font-bold rounded-md shadow-md hover:shadow-amber-700 transition-shadow duration-300"
          >
            LOGIN
          </button>
        </form>

        <p className="text-gray-700 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="underline font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
