const Login = () => {
  return (
    <div className="  relative  bg-black rounded-lg place-content-center ">
      <header className="text-white  flex flex-row justify-end  items-center p-5 font-bold h-15">
        <img
          className="absolute   -left-8 w-[30vh]
         "
          src="public\img\logo.png"
          alt="logo"
        />
        <h2>Iniciar sesión</h2>
      </header>

      <section className="flex flex-col  w-[75vw] sm:flex-row ">
        <img
          src="public\img\imagenLogin.png"
          className="w-1/2 h-auto"
          alt="logotipo"
        />

        <form
          action=""
          noValidate
          className="flex flex-col  font-bold text-lg md:text-3xl bg-fondo w-1/2  items-center  justify-evenly content-center  "
        >
          <div className="flex flex-col w-[20rem]  space-y-2">
            <label htmlFor="">Correo Electrónico:</label>
            <input className="h-10" type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col w-[20rem] space-y-2">
            <label>Contraseña</label>
            <input
              className="h-10"
              type="password"
              name="password"
              id="password"
            />
          </div>

          <a href="">Olvidé mi contraseña</a>
          <button className="order-last">Ingresar</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
