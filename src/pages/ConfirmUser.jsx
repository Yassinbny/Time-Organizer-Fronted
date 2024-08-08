import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmUserLayout from "../layouts/ConfirmUserLayout.jsx";

const ConfirmUser = () => {
  const { validationCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const confirmUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}users/confirm/${validationCode}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setMessage("¡Todo listo! Ya puedes iniciar sesión para comenzar.");
      setError(false); // Confirmación exitosa
    } catch (error) {
      setMessage("Error: el token es erróneo o ha caducado."); // Mensaje de error
      setError(true); // Error al confirmar
    }
  };

  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <ConfirmUserLayout>
      <div className="flex flex-col h-full justify-between text-center text-black py-20">
        <div className="text-center">
          {error ? (
            <div className="text-red-500">
              <h3>{message}</h3>
            </div>
          ) : (
            <div className="text-[4vw] sm:text-[24px] md:text-[32px]">
              <h3>{message}</h3>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {error ? (
            <button
              onClick={() => navigate("/signup")}
              className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg mt-4 uppercase"
            >
              Volver a Registrarse
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg mt-4 uppercase"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </ConfirmUserLayout>
  );
};

export default ConfirmUser;