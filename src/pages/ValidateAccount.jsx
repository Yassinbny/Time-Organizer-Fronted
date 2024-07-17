import UsersLayout from "../layouts/UsersLayout.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ValidateAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Validando tu cuenta...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("Token de validación no encontrado.");
      return;
    }

    const validateUser = async () => {
      const response = await fetch(`http://localhost:3000/auth/validate`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const { ok, error } = await response.json();

      if (!ok) {
        setMessage(`Error: ${error}`);
        return;
      }

      setMessage("Cuenta validada exitosamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 3000);
    };

    validateUser();
  }, [searchParams, navigate]);

  return (
    <UsersLayout componente={"Validación de Cuenta"}>
      <div className="flex flex-col justify-center items-center w-full h-full content-center">
        <p>{message}</p>
      </div>
    </UsersLayout>
  );
};

export default ValidateAccount;
