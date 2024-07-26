import { Link } from 'react-router-dom';
import UsersLayout from '../layouts/UsersLayout.jsx'; 

const NotFound = () => {
  return (
    <UsersLayout componente={"Página no encontrada"}>
      <div className="flex flex-col justify-center items-center w-full h-full content-center text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="mb-4">Lo sentimos, pero la página que estás buscando no existe.</p>
        <Link to="/" className="text-teal-500 underline decoration-solid text-lg">
          Volver a la página principal
        </Link>
      </div>
    </UsersLayout>
  );
};

export default NotFound;
