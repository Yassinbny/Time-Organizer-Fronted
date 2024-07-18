import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="  relative  bg-black border-solid border-2 border-black rounded-3xl place-content-center ">
      <header className="text-white  flex flex-row justify-end  items-center p-5 font-bold h-15">
        <img
          className="absolute -top-6 -left-2 sm:-top8  sm:left-1 w-[22vh]  
         "
          src="images\superLetteringMultBlanco-removebg-preview2.png"
          alt="logo"
        />
        <h2 className="text-2xl">hola</h2>
      </header>

      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-[60vw] h-[90vh] sm:h-[90vh] sm:flex-row ">
        <div
          className="flex flex-col sm:flex-row w-[80vw] sm:w-full  h-[90vh] sm:h-full rounded-b-3xl space-y-4  font-bold text-lg md:text-3xl bg-white
            "
        >
          {children}
        </div>
      </section>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;
