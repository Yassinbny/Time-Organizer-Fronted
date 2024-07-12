import { AuthContextProvider } from "./context/auth.context.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* cuando creeis un componente PAGE(esto es un componente
         principal el cual dentro tiene otros componentes, 
         lo poneis aqui con su path de referencia 
        el cual ustedes dareis un nombre) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
