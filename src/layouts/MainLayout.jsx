import PropTypes from "prop-types";
import Header from "../components/Header.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="  relative sm:w-[70vw] bg-black border-solid border-2 border-black rounded-3xl place-content-center ">
      <Header />
      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-full h-[90vh] sm:h-[90vh]   sm:flex-row ">
        <div
          className="flex flex-col sm:flex-row  w-[84vw] sm:w-full  h-[90vh] sm:h-full  rounded-b-3xl  font-bold text-lg md:text-2xl bg-white
            "
        >
          {children}
        </div>
      </section>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MainLayout;
