import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ConfirmUserLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black border-solid border-2 border-black rounded-3xl place-content-center">
      <header className="text-white flex flex-row justify-end items-center h-[7vh] p-5 font-bold sm:h-[6vh] md:h-[7vh] lg:h-[8vh]">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="absolute -top-3 -left-2 w-[15vh] sm:-top8  sm:left-1 sm:w-[18vh] md:w-[20vh] lg:w-[22vh]"
          src="../images/superLetteringMultBlanco-removebg-preview (1).png"
          alt="Logo"
        />
        <h2 className="text-lg md:text-2xl">Confirmar Usuario</h2>
      </header>

      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-[60vw] h-[90vh] sm:h-[90vh] sm:flex-row">
        <div className="bg-white rounded-b-3xl sm:basis-1/2 sm:h-full hidden sm:flex content-center justify-center items-center">
          <div className="text-center">
            <img
              src="../images/logo.png"
              className="object-cover md:h-[250px] lg:h-[600]"
              alt="Logo"
            />
            <ul className="list-none mt-4 text-left text-black font-semibold">
              <li className="py-1 text-lg" style={{ marginLeft: "20px" }}>• Visual</li>
              <li className="py-1 text-lg" style={{ marginLeft: "70px" }}>• Motivadora</li>
              <li className="py-1 text-lg" style={{ marginLeft: "120px" }}>• Dinámica</li>
              <li className="py-1 text-lg" style={{ marginLeft: "180px" }}>• Rápida</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full sm:basis-1/2 h-full  rounded-b-3xl font-bold text-lg md:text-2xl bg-fondo p-4 justify-between">
          {children}
        </div>
      </section>
    </div>
  );
};

ConfirmUserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConfirmUserLayout;