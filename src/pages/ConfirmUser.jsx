import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersLayout from "../layouts/UsersLayout.jsx";

const ConfirmUser = () => {
  const { validationCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const confirmUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/confirm/${validationCode}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setError("Error al confirmar usuario: " + error.message);
    }
  };
  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <UsersLayout componente={"Confirmar Usuario"}>
      <div className="flex flex-col justify-evenly w-full h-full content-center">
        <div className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-3xl">
          {error ? (
            <div className="text-red-500">
              <h2>{error}</h2>
              <button
                onClick={() => navigate("/signup")}
                className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg mt-4"
              >
                Volver a Registrarse
              </button>
            </div>
          ) : (
            <div className="text-green-500">
              <h2>{message}</h2>
              <button
                onClick={() => navigate("/login")}
                className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg mt-4"
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </UsersLayout>
  );
};

export default ConfirmUser;
