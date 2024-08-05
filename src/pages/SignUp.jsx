import { Link, useNavigate } from "react-router-dom";
import UsersLayout from "../layouts/UsersLayout.jsx";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Eliminar campo de confirmación de contraseña antes de enviar.
    delete data.password2;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/sign-up`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      toast.success("Usuario registrado correctamente. Es necesario confirmar tu cuenta en el correo electrónico.");
      reset();
      navigate("/login");
    } catch (error) {
      console.log("Error al registrar usuario", error);
      toast.error(error.message || "Error al registrar usuario");
    }
  });

  return (
    <UsersLayout componente={"Registrar usuario"}>
      <div className="flex flex-col justify-evenly w-full h-full content-center">
        <form
          action=""
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-3xl "
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="username">Nombre:</label>
            <input
              className={`h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white ${errors.username ? 'border-red-500' : ''}`}
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className={`h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white ${errors.email ? 'border-red-500' : ''}`}
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "El correo es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "El correo no es válido",
                },
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Contraseña:</label>
            <input
              className={`h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white ${errors.password ? 'border-red-500' : ''}`}
              type="password"
              name="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password2">Confirmar contraseña:</label>
            <input
              className={`h-15 rounded-xl w-[250px] sm:w-[250px] sm:h-10 md:w-[25vw] md:h-16 p-3 bg-white ${errors.password2 ? 'border-red-500' : ''}`}
              type="password"
              name="password2"
              id="password2"
              {...register("password2", {
                required: {
                  value: true,
                  message: "La confirmación de la contraseña es requerida",
                },
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.password2 && <span className="text-red-500">{errors.password2.message}</span>}
          </div>
          <button
            className="bg-black hover:bg-teal-500 text-white font-bold py-2 px-5 rounded-lg"
            type="submit"
          >
            Registrarse
          </button>
        </form>
        <div>
          <div className="flex flex-col items-center rounded-xl content-center justify-evenly text-[4vw] sm:text-[18px] md:text-[24px] bg-black text-2xl text-white h-15 sm:h-18 md:h-22">
            <p>¿Ya tienes una cuenta?</p>
            <Link
              to="/login"
              className="text-teal-500 underline decoration-solid"
            >
              Inicia Sesión AQUÍ
            </Link>
          </div>
        </div>
      </div>
    </UsersLayout>
  );
};

export default SignUp;
