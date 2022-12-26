import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Loading from "./Loading";
import Header from "../components/Header";
import Main from "../components/Main";
import Home from "../pages/Home";

function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row flex-1 h-screen overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Main>
            <Routes>
              <Route path="/home" element={<Home />} />
            </Routes>
          </Main>
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
