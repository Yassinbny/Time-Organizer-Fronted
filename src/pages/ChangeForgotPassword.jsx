import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importamos toast

const ChangeForgotPassword = () => {
  const { changePassword, currentUser } = useContext(AuthContext);
  const [formValues, handleInputChange] = useForm({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { email, code, newPassword, confirmPassword } = formValues;
  const navigate = useNavigate();
  const [error] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("El formato del correo electrónico es inválido.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const result = await changePassword(email, code, newPassword, confirmPassword);

    if (result.ok) {
      toast.success("Contraseña cambiada correctamente. Puedes iniciar sesión.");
      navigate("/login");
    } else {
      toast.error(result.message || "No se pudo cambiar la contraseña.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/change-password");
    }
  }, [currentUser, navigate]);

  return (
    <UsersLayout componente={"RECUPERA TU CUENTA"}>
      <div className="bg-rose-100 flex flex-col justify-evenly w-full h-full content-center rounded-xl">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-xl lg:text-2xl"
          onSubmit={handleSubmit}
        >
          <p className="text-center justify-center font-extrabold leading-[1.8]">
            ¡Ahora puedes cambiar tu contraseña olvidada!
          </p>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="code">Tu Código:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white"
              type="text"
              value={code}
              onChange={handleInputChange}
              name="code"
              id="code"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white"
              type="password"
              value={newPassword}
              onChange={handleInputChange}
              name="newPassword"
              id="newPassword"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              name="confirmPassword"
              id="confirmPassword"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-black text-white text-center font-bold w-[180px] sm:w-[320px] md:w-[240px] h-10 sm:h-12 md:h-20 rounded-xl">
            CÁMBIALA Y LOGUÉATE
          </button>
        </form>
      </div>
    </UsersLayout>
  );
};

export default ChangeForgotPassword;