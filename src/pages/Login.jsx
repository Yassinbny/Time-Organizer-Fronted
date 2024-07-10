const Login = () => {
  return (
    <div className="flex flex-col  content-center text-blue justify-center">
      <article>
        <header>
          <h2>Iniciar sesión</h2>
        </header>
        <form action="" noValidate className="block">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" />

          <label htmlFor="">Contraseña</label>
          <input type="password" name="password" id="password" />
          <a href="">Olvidé mi contraseña</a>

          <button>Ingresar</button>
        </form>
      </article>
    </div>
  );
};

export default Login;
