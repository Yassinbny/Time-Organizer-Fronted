import UsersLayout from "../layouts/UsersLayout.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ValidateAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const validateAccount = async (token) => {
      try {
        const response = await fetch(`http://localhost:3000/auth/confirm?token=${token}`);
        const responseData = await response.json();
        if (responseData.ok) {
          navigate('/sign-in');
        } else {
          setMessage(responseData.error || 'Error al validar la cuenta.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error al validar la cuenta.');
      }
    };

    if (!searchParams.has('token')) {
      console.log('No hay token');
    } else {
      const token = searchParams.get('token');
      validateAccount(token);
    }
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
