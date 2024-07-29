import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersLayout from "../layouts/UsersLayout.jsx";

const ValidateAccount = () => {
  const { validationCode } = useParams();
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/confirm/${validationCode}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        setValidationMessage(responseData.message);
      } catch (error) {
        console.log("Error al validar usuario", error);
        setValidationMessage("Error al validar usuario");
      }
    };
    validateUser();
  }, [validationCode]);

  return (
    <UsersLayout componente={"Validar Cuenta"}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-3xl font-bold mb-4">Validación de Cuenta</h1>
        <p className="text-lg">{validationMessage}</p>
        {validationMessage === "Registro completado con éxito." && (
          <button
            className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg mt-4"
            onClick={() => navigate("/login")}
          >
            Ir al Login
          </button>
        )}
      </div>
    </UsersLayout>
  );
};

export default ValidateAccount;
