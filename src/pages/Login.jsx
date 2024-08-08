import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify"; // Importa toast

const Login = () => {
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}auth/sign-in`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formValues),
        }
      );

      const { ok, token, message } = await response.json();

      if (!ok) {
        // Mostrar notificaciones basadas en el mensaje del backend
        toast.error(message);
        return;
      }

      signIn(token);
      // Mostrar notificación de éxito
      toast.success(message); // El mensaje de bienvenida incluye el emoji
      navigate("/");
    } catch (error) {
      // Mostrar notificación de error general
      toast.error("Error al iniciar sesión");
      console.log(error); // Mantén el log para depuración si es necesario
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]); // Agregado navigate a las dependencias

  return (
    <UsersLayout componente={"Iniciar Sesión"}>
      <div className="flex flex-col justify-evenly w-full h-full content-center">
        <form
          action=""
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly content-center
          text-base sm:text-lg md:text-xl lg:text-2xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-2 font-bold">
            <label htmlFor="">Correo Electrónico:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col space-y-2 font-bold">
            <label>Contraseña:</label>
            <input
              className="h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white "
              type="password"
              value={password}
              onChange={handleInputChange}
              name="password"
              id="password"
            />
            <a
              href="/recover-password"
              className="text-sm text-orange-400 underline decoration-solid"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button className="bg-black text-white font-bold py-3.5 px-7 rounded-lg">
            Iniciar Sesión
          </button>
        </form>
        <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[18px] md:text-[24px] bg-black text-1xl text-white h-15 sm:h-18 md:h-22">
          <p>¿No tienes una cuenta?</p>
          <Link
            to="/signup"
            className="text-teal-500 underline decoration-solid "
          >
            Registrate AQUÍ
          </Link>
        </div>
      </div>
    </UsersLayout>
  );
};

export default Login;
