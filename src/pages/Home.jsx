
import MainLayout from "../layouts/MainLayout.jsx";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center m-auto">
        {" "}
        <img
          className="w-[80vw] md:w-[65vw] lg:w-[45vw]"
          src="images\textoInicio.png"
          alt="inicio"
        />        
      </div>
      
    </MainLayout>
  );
};

export default Home;
