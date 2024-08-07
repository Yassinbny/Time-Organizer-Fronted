import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";

const ChangeForgotPassword = () => {
  const { changePassword, currentUser } = useContext(AuthContext);
  const [formValues, handleInputChange] = useForm({
    email: "",
    code: "",
    newPassword: "",
  });
  const { email, code, newPassword } = formValues;
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("El formato del correo electrónico es inválido.");
      return;
    }

    const result = await changePassword(email, code, newPassword);

    if (result.ok) {
      navigate("/login");
    } else {
      setError(result.message || "No se pudo cambiar la contraseña.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/change-password");
    }
  }, [currentUser, navigate]);

  return (
    <UsersLayout componente={"RECUPERA TU CUENTA"}>
      <div className="bg-green-100 flex flex-col justify-evenly w-full h-full content-center p-6 rounded-xl">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-3xl"
          onSubmit={handleSubmit}
        >
          <p className="text-center justify-center font-extrabold leading-[1.5]">
            Ahora puedes cambiar tu contraseña.
          </p>
          <div className="flex flex-col space-y-2 text-[4vw] sm:text-[20px] md:text-[30px] leading-[1.3] font-extrabold">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-14 md:w-[25vw] md:h-16 p-3 bg-white"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 text-[4vw] sm:text-[20px] md:text-[30px] leading-[1.3] font-extrabold">
            <label htmlFor="code">Código de Recuperación:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-14 md:w-[25vw] md:h-16 p-3 bg-white"
              type="text"
              value={code}
              onChange={handleInputChange}
              name="code"
              id="code"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 text-[4vw] sm:text-[20px] md:text-[30px] leading-[1.3] font-extrabold">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-14 md:w-[25vw] md:h-16 p-3 bg-white"
              type="password"
              value={newPassword}
              onChange={handleInputChange}
              name="newPassword"
              id="newPassword"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-black text-white text-center font-bold w-[180px] sm:w-[320px] md:w-[220px] h-10 sm:h-12 md:h-20 rounded-xl">
            CAMBIAR CONTRASEÑA
          </button>
        </form>
        
      </div>
    </UsersLayout>
  );
};

export default ChangeForgotPassword;