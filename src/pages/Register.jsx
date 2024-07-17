import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { email, password, confirmPassword } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValues),
    });
    const { ok, error } = await response.json();

    if (!ok) {
      console.error(error);
      return;
    }

    navigate(`/validate-account?token=${response.token}`);
  };

  return (
    <UsersLayout componente={"Registrarse"}>
      <div className="flex flex-col justify-evenly w-full h-full content-center">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-3xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] sm:h-16 md:w-[25vw] md:h-24 p-3 bg-white"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Contraseña:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] md:w-[25vw] md:h-24 sm:h-16 p-3 bg-white"
              type="password"
              value={password}
              onChange={handleInputChange}
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              className="h-10 rounded-xl w-[250px] sm:w-[350px] md:w-[25vw] md:h-24 sm:h-16 p-3 bg-white"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <button className="bg-black text-white text-center font-bold w-[150px] h-10 sm:w-[300px] sm:h-12 md:w-[300px] md:h-24 rounded-xl">
            Registrarse
          </button>
        </form>
        <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[24px] md:text-[32px] bg-black text-1xl text-white h-20 sm:h-32 md:h-44">
          <p>¿Ya tienes una cuenta?</p>
          <a href="/login" className="text-teal-500 underline decoration-solid">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </UsersLayout>
  );
};

export default Register;
