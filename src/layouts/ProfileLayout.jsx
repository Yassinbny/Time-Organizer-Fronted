import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

const ProfileLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="  relative sm:w-[70vw] bg-black border-solid border-2 border-black rounded-3xl place-content-center ">
      <Header />
      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-full h-[90vh] sm:h-[90vh] sm:flex-row ">
        <div
          className="flex flex-col sm:flex-row  w-[84vw] sm:w-full h-[90vh] sm:h-full rounded-bl-3xl  font-bold text-lg md:text-2xl bg-white
            "
        >
        <div className="flex sm:flex-col justify-evenly items-center bg-fondo sm:text-2xl rounded-bl-3xl sm:justify-center h-[20vh] sm:h-full py-4 sm:w-[18vw] md:w-[24vw] lg:w-[20vw] md:text-2xl sm:space-y-4 md:space-y-20 mt-12 sm:mt-0 ">
        </div>

          {children}
        </div>
        <div className="flex sm:flex-col justify-evenly items-center sm:justify-end bg-fondo sm:text-2xl rounded-br-3xl  h-[20vh] sm:h-full py-4 sm:w-[18vw] md:w-[24vw] lg:w-[19vw] md:text-2xl sm:space-y-4 md:space-y-20 mt-12 sm:mt-0 ">
            <button type="submit" className=" rounded-3xl text-center sm:text-xl md:text-xl lg:text-2xl text-white bg-black h-[7vh] sm:w-[12vw] md:w-[15vw] lg:w-[10vw]  transition duration-200"
            onClick={() => navigate("/login") } >
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
