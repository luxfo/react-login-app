import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthApi } from "../api/auth.api";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../containers/Loading";

function Verification() {
  const { isLoading, setIsLoading } = useLoading();
  const navigate = useNavigate();

  const [input, setInput] = useState({ verificationCode: "" });

  const [error, setError] = useState({
    verificationCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "verificationCode":
          if (!value) {
            stateObj[name] = "Please enter a Verification Code.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await AuthApi.verify(input.verificationCode);
      setIsLoading(false);
      toast.success(response.data.message, {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(resMessage, {
        position: "top-right",
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
              Verification
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={input.verificationCode}
                  onChange={handleChange}
                  onBlur={validateInput}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Verification Code"
                />
                {error.verificationCode && (
                  <span className="text-red-500 text-sm">
                    {error.verificationCode}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                id="btnVerify"
                name="btnVerify"
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
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Verification;
