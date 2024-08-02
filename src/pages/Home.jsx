import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center m-auto  ">
        {" "}
        <img
          className="sm:w-[40vw] "
          src="images\textoInicio.png"
          alt="inicio"
        />
      </div>
    </MainLayout>
  );
};

export default Home;
