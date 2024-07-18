import { AuthContextProvider } from "./context/auth.context.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";



function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* cuando creeis un componente PAGE(esto es un componente
         principal el cual dentro tiene otros componentes, 
         lo poneis aqui con su path de referencia 
        el cual ustedes dareis un nombre) */}
        <Route path ="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
