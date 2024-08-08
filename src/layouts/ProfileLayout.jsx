import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth.jsx";
import Header from "../components/Header.jsx";

const ProfileLayout = ({ children }) => {
  const { signOut, navigate } = useAuth();

  return (
    <div className="  relative sm:w-[70vw] bg-black border-solid border-2 border-black rounded-3xl place-content-center ">
      <Header />
      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-full h-[90vh] sm:h-[90vh] sm:flex-row ">
        <div className="flex flex-col md:flex-row  w-full md:w-[55vw] h-[90vh] md:h-full pb-0 rounded-bl-3xl text-center font-bold text-lg md:text-2xl bg-white">
          <div className="flex sm:flex-col justify-evenly items-center md:bg-fondo rounded-bl-3xl md:h-[90vh] py-4 md:w-[24vw] lg:w-[20vw] md:space-y-20 "></div>

          {children}
        </div>
        <div className="flex flex-col items-center md:justify-end md:bg-fondo rounded-br-3xl h-[8vh] md:h-full md:w-[16vw] lg:w-[15vw] p-2 md:pb-8 lg:pb-10 md:space-y-20 text-l md:text-xl lg:text-2xl">
          <button
            type="button"
            className=" rounded-3xl text-center leading-none text-red-400 md:text-white bg-black h-0 md:h-[7vh] w-[12vw] transition duration-200"
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </section>
    </div>
  );
};

ProfileLayout.propTypes = {
  children: PropTypes.element,
};

export default ProfileLayout;
