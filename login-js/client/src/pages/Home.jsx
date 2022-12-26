import { useState, useEffect } from "react";
import { UserApi } from "../api/user.api";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../containers/Loading";
import { toast } from "react-toastify";

function Home() {
  const { authUser } = useAuth();

  const [user, setUser] = useState();
  const { isLoading, setIsLoading } = useLoading();

  const getUser = async (e) => {
    try {
      setIsLoading(true);
      const response = await UserApi.get(authUser);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="mx-auto">
        {user && (
          <div className="bg-gray-600 text-white py-10 px-14 rounded-md space-y-6">
            <h1 className="text-xl font-bold capitalize">
              Welcome {user.first_name} {user.last_name}
            </h1>
            <p className="text-gray-200 text-sm">Email: {user.email}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
