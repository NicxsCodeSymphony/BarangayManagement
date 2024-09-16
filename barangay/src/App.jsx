import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Information from "./pages/Infomation"
import Officials from "./pages/Officials"
import ManageOfficials from "./pages/ManageOfficials"
import Residents from "./pages/Residents"
import ManageResidents from "./pages/ManageResidents"
import { Toaster } from "sonner"


function App() {

  return (
    <>
    <div>
        <Toaster richColors  position="bottom-right" />
<Routes>

    <Route exact path="/" element={<Dashboard />} />
    <Route exact path="/dashboard" element={<Dashboard />} />
    <Route exact path="/information" element={<Information />} />
    <Route exact path="/officials" element={<Officials />} />
    <Route exact path="/manage-officials" element={<ManageOfficials />} />
    <Route exact path="/residents" element={<Residents />} />
    <Route exact path="/manage-residents" element={<ManageResidents />} />
</Routes>
    </div>
    </>
  )
}

export default App
