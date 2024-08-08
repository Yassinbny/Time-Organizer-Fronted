import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importamos toast

const RecoverPassword = () => {
  const { recoverPassword, currentUser } = useContext(AuthContext);
  const [formValues, handleInputChange] = useForm({
    email: "",
  });
  const { email } = formValues;
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    // Validación básica del formato de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formato del email
    if (!validateEmail(email)) {
      toast.error("El formato del correo electrónico es inválido.");
      return;
    }

    const result = await recoverPassword(email);
    console.log("Resultado de recoverPassword:", result);

    if (result.ok) {
      toast.success("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      navigate("/confirmation-recover-password"); // Redirige a la página de confirmación
    } else {
      toast.error(result.message || "El correo electrónico no existe. Prueba otra vez o únete a nosotros creando una cuenta.");
      setTimeout(() => navigate("/signup"), 5000);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/recover-password");
    }
  }, [currentUser, navigate]);

  return (
    <UsersLayout componente={"¿OLVIDASTE TU CONTRASEÑA?"}>
      <div className="bg-teal-100 flex flex-col justify-evenly w-full h-full content-center">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly content-center
          text-base sm:text-lg md:text-2xl"
          onSubmit={handleSubmit}
        >
          <p className="text-center justyify-center font-extrabold leading-[1.3]">
            ¡No hay problema!
            <br />
            Sólo necesitas tu dirección de email, ¡y solucionado!
            <br />
          </p>
          <div className="flex flex-col space-y-2 font-bold">
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
          <button className="bg-black text-white font-bold py-3.5 px-7 rounded-lg">
            RECUPERAR
          </button>
        </form>
        <div className="flex flex-col items-center rounded-xl content-center justify-evenly text-[4vw] sm:text-[18px] md:text-[24px] bg-black text-2xl text-white h-15 sm:h-18 md:h-22">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-">
            ¿No tienes una cuenta?
          </p>
          <Link
            to="/signup"
            className="text-orange-400 underline decoration-solid mb-1"
          >
            Regístrate AQUÍ
          </Link>
        </div>
      </div>
    </UsersLayout>
  );
};

export default RecoverPassword;
