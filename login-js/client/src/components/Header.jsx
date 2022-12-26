import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../containers/Loading";

function Header() {
  const { setAuthUser } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      setIsLoading(true);
      setAuthUser(null);
      setIsLoading(false);
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setAuthUser(null);
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <header className="flex border-b border-gray-200 px-8 z-30 py-4 shadow-md bg-mkt-500">
        <div className="flex items-center justify-left">
          <a href="#" className="text-2xl font-semibold text-white">
            LoginApp
          </a>
        </div>
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-800"></div>
        <div className="flex items-center justify-right text-white dark:text-mkt-100">
          <ul className="flex items-center justify-center flex-shrink-0 space-x-6">
            <li
              className="relative cursor-pointer hover:underline"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
