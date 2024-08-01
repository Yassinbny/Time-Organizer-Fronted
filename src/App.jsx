import { AuthContextProvider } from "./context/auth.context.jsx";
import MyCalendar from "./pages/Calendar.jsx";
import Login from "./pages/Login.jsx";
import ConfirmUser from "./pages/ConfirmUser.jsx";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import NotFound from './components/NotFound.jsx';
import Help from "./pages/Help.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";
import Administrator from "./pages/Administrator.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* cuando creeis un componente PAGE(esto es un componente
         principal el cual dentro tiene otros componentes, 
         lo poneis aqui con su path de referencia 
        el cual ustedes dareis un nombre) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/confirm/:validationCode" element={<ConfirmUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/help" element={<Help />} />

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/administrator" element={<Administrator />} /> 

      </Routes>
    </AuthContextProvider>
  );
}

export default App;
