import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store/store"; // Make sure your store is correctly imported

import User from "./User";
import Admin from "./Admin";
import Login from "./components/Admin/Login";
import LandingPage from "./Pages/LandingPage";
import ProtectedAdminLogin from "./private/ProtectedAdminLogin";
import { ToastContainer } from "react-toastify";
import Clarity from "@microsoft/clarity";
import PageNotFound from "./components/shared/PageNotFound";

function App() {
  useEffect(() => {
    Clarity.init(import.meta.env.VITE_CLARITY_PROJECT_ID);
  }, []);
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <ToastContainer position="bottom-right" />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/*" element={<User />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route
                path="/admin/login"
                element={
                  <ProtectedAdminLogin>
                    <Login />
                  </ProtectedAdminLogin>
                }
              />
            </Routes>
          </Router>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
