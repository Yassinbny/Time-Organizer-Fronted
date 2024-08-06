import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Link, useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const { recoverPassword, currentUser } = useContext(AuthContext);
  const [formValues, handleInputChange] = useForm({
    email: "",
  });
  const { email } = formValues;
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    // Validación básica del formato de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validar formato del email
  if (!validateEmail(email)) {
    setError("El formato del correo electrónico es inválido.");
    return;
  }

  const result = await recoverPassword(email);

  if (result.ok) {
    navigate("/confirmation-recover-password");
  } else {
    setError(result.message || "No se pudo enviar la solicitud.");
    setTimeout(() => navigate("/signup"), 5000);
  }
};

useEffect(() => {
  if (currentUser) {
    navigate("/recover-password");
  }
}, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      navigate("/recover-password");
    }
  }, [currentUser, navigate]);

  return (
    <UsersLayout componente={"¿OLVIDASTE TU CONTRASEÑA?"}>
      <div className="bg-teal-100 flex flex-col justify-evenly w-full h-full content-center p-6 rounded-xl">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-3xl "
          onSubmit={handleSubmit}
        >
          <p className="text-center justyify-center font-extrabold leading-[1.3]">
            ¡No hay problema!
            <br />
            Sólo necesitas tu dirección de email, ¡y solucionado!
            <br />
          </p>
          <div className="flex flex-col space-y-2 text-[4vw] sm:text-[20px] md:text-[30px] leading-[2] font-extrabold ">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-14 md:w-[25vw] md:h-18 p-3 bg-white"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
              id="email"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-black text-white text-center font-bold w-[150px] h-10 sm:w-[300px] sm:h-12 md:w-[200px] md:h-20 rounded-xl">
            RECUPERAR
          </button>
        </form>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-black text-white p-6 max-w-3xl mx-auto">
  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4">
    ¿No tienes una cuenta?
  </p>
          <Link
            to="/signup"
            className="text-orange-400 underline decoration-solid"
          >
            Regístrate AQUÍ
            </Link>
        </div>
      </div>
    </UsersLayout>
  );
};

export default RecoverPassword;
