import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthApi } from "../api/auth.api";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../containers/Loading";

function Register() {
  const { isLoading, setIsLoading } = useLoading();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e: any) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj: any = { ...prev, [name]: "" };

      switch (name) {
        case "firstName":
          if (!value) {
            stateObj[name] = "Please enter First Name.";
          }
          break;
        case "lastName":
          if (!value) {
            stateObj[name] = "Please enter Last Name.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter an Email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resMessage: any = await AuthApi.register(input);
      setIsLoading(false);
      toast.success(resMessage, {
        position: "top-center",
      });
      navigate("/verification");
    } catch (error: any) {
      setIsLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(resMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="flex h-screen items-center bg-gray-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          className="w-full max-w-md rounded-md shadow-md shadow-gray-500"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          {isLoading ? <Loading /> : ""}
          <div className="bg-mkt-500 rounded-t-md">
            <h2 className="p-4 text-center text-3xl font-bold tracking-tight text-white">
              Registration
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name"
                />
                {error.firstName && (
                  <span className="text-red-500 text-sm">
                    {error.firstName}
                  </span>
                )}
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                />
                {error.lastName && (
                  <span className="text-red-500 text-sm">{error.lastName}</span>
                )}
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
                {error.email && (
                  <span className="text-red-500 text-sm">{error.email}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                {error.password && (
                  <span className="text-red-500 text-sm">{error.password}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {error.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={
                  !Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "")
                }
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white" +
                  (!Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "")
                    ? " bg-indigo-200 cursor-not-allowed"
                    : " bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")
                }
              >
                Save
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">
                You already have an account?
              </span>
              <NavLink
                to="/login"
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
