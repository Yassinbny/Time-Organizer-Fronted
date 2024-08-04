import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UsersLayout = ({ children, componente }) => {
  const navigate = useNavigate();
  return (
    <div className="  relative  bg-black border-solid border-2 border-black rounded-3xl place-content-center ">
      <header className="text-white  flex flex-row justify-end  items-center p-5 font-bold h-15">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="absolute -top-8 -left-2 sm:-top-17  sm:left-0 w-[22vh] 
         "
          src="images\superLetteringMultBlanco-removebg-preview (1).png"
          alt="logo"
        />
        <h2 className="text-2xl">{componente}</h2>
      </header>

      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-[60vw] h-[90vh] sm:h-[90vh] sm:flex-row ">
        <div
          className="bg-white rounded-b-3xl sm:basis-1/2 sm:h-full hidden sm:flex content-center  justify-center items-center
         "
        >
          <img
            src="images\login-img.png"
            className="object-cover  h-[600px]"
            alt="logo"
          />
        </div>
        <div
          className="flex flex-col w-full sm:basis-1/2 h-full rounded-b-3xl  font-bold text-lg md:text-3xl bg-fondo
            "
        >
          {children}
        </div>
      </section>
    </div>
  );
};

UsersLayout.propTypes = {
  children: PropTypes.element,
  componente: PropTypes.string,
};
export default UsersLayout;
