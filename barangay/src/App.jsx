import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Information from "./pages/Infomation"; // Fixed typo from 'Infomation' to 'Information'
import Officials from "./pages/Officials";
import ManageOfficials from "./pages/ManageOfficials";
import Residents from "./pages/Residents";
import ManageResidents from "./pages/ManageResidents";
import { Toaster } from "sonner";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token exists, navigate to the login page
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <Toaster richColors position="bottom-right" />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route exact path="/information" element={<PrivateRoute element={<Information />} />} />
          <Route exact path="/officials" element={<PrivateRoute element={<Officials />} />} />
          <Route exact path="/manage-officials" element={<PrivateRoute element={<ManageOfficials />} />} />
          <Route exact path="/residents" element={<PrivateRoute element={<Residents />} />} />
          <Route exact path="/manage-residents" element={<PrivateRoute element={<ManageResidents />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
