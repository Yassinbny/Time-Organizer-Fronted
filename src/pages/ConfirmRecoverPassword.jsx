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
      <div className="bg-green-100 flex flex-col justify-evenly w-full h-full content-center">
        <div
          className="flex flex-col items-center w-full h-full justify-evenly text-base sm:text-lg md:text-2xl "
        >
          <p className="text-center justyify-center font-extrabold leading-[1.3]">
            Revisa tu correo y sigue las instrucciones para poder recuperar tu contraseña.
          </p>

          <button className="bg-black text-white font-bold py-3.5 px-7 rounded-lg"
          onClick={() => navigate("/change-password")}
          >
            RECUPÉRALA
          </button>
        </div>
        <div className="flex flex-col items-center rounded-2xl content-center justify-evenly text-[4vw] sm:text-[18px] md:text-[24px] bg-black text-1xl text-white h-15 sm:h-18 md:h-22">
          <p>¿No tienes una cuenta?</p>
          <Link
            to="/signup"
            className="text-fuchsia-400 underline decoration-solid mb-1"
          >
            Regístrate AQUÍ
            </Link>
        </div>
      </div>
    </UsersLayout>
  );
};

export default ConfirmRecoverPassword;