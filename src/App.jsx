import { AuthContextProvider } from "./context/auth.context.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ValidateAccount from "./pages/ValidateAccount.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validate-account" element={<ValidateAccount />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
