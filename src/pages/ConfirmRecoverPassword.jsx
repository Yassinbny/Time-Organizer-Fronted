import UsersLayout from "../layouts/UsersLayout.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Link, useNavigate } from "react-router-dom";

const ConfirmRecoverPassword = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!currentUser) {
        navigate("/confirmation-recover-password");
      }
    }, [currentUser, navigate]);

  return (
    <UsersLayout componente={"¡YA CASI ESTÁ!"}>
      <div className="bg-teal-100 flex flex-col justify-evenly w-full h-full content-center p-6 rounded-xl">
        <div
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-3xl "
        >
          <p className="text-center justyify-center font-extrabold leading-[1.3]">
            Revisa tu correo y sigue las instrucciones para poder recuperar tu contraseña.
          </p>

          <button className="bg-black text-white text-center font-bold w-[150px] h-10 sm:w-[300px] sm:h-12 md:w-[200px] md:h-20 rounded-xl"
          onClick={() => navigate("/login")}
          >
            INICIAR SESIóN
          </button>
        </div>
        <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[24px] md:text-[32px] bg-black text-1xl text-white h-20 sm:h-32 md:h-44">
          <p>¿No tienes una cuenta?</p>
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

export default ConfirmRecoverPassword;