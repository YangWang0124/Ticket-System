import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Customer"]}>
                <CreateTicket />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
