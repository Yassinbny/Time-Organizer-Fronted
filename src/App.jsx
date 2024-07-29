import { AuthContextProvider } from "./context/auth.context.jsx";
import MyCalendar from "./pages/Calendar.jsx";
import Login from "./pages/Login.jsx";
import ValidateAccount from "./pages/ValidateAccount.jsx";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import NotFound from './components/NotFound.jsx';

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
        <Route path="/confirm/:validationCode" element={<ValidateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
