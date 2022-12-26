import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthApi } from "../api/auth.api";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../containers/Loading";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setAuth } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await AuthApi.signIn(user);
      setAuth(response.data);
      setIsLoading(false);
      navigate("/home");
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

  const handleChange = ({ target: { value, name } }: { target: any }) => {
    setUser({ ...user, [name]: value });
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
              LoginApp
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Sign In
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">Need an account?</span>
              <NavLink
                to="/register"
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Register
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
