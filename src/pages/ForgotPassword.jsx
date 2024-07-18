
import UsersLayout from "../layouts/UsersLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

const ForgotPassword = () => {
  const { recoverPassword } = useContext(AuthContext);
  const [formValues, handleInputChange] = useForm({
    email: ""
  });
  const { email } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await recoverPassword(email);
    } catch (error) {
      console.error("Error al enviar solicitud de recuperación de contraseña:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <UsersLayout componente={"¿OLVIDASTE TU CONTRASEÑA?"}>
      <div className="bg-teal-100 flex flex-col justify-evenly w-full h-full content-center p-6 rounded-xl">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-3xl " 
          onSubmit={handleSubmit}
        >
          <p className="text-center justyify-center font-extrabold leading-[1.3]">¡No hay problema!<br/>Sólo necesitas tu dirección de email, ¡y solucionado!<br/></p>
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
          <button className="bg-black text-white text-center font-bold w-[150px] h-10 sm:w-[300px] sm:h-12 md:w-[200px] md:h-20 rounded-xl">
            RECUPERAR
          </button>
        </form>
        <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[24px] md:text-[32px] bg-black text-1xl text-white h-20 sm:h-32 md:h-34">
          <p>¿No tienes una cuenta?</p>
          <a href="/signup" className="text-orange-400
#fb923c underline decoration-solid">
            Regístrate AQUÍ
          </a>
        </div>
      </div>
    </UsersLayout>
  );
};

export default ForgotPassword;