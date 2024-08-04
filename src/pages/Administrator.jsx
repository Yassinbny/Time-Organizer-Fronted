import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils"; // Importa las funciones de notificación

const Administrator = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/");
        setUsers(response.data);
      } catch (error) {
        showErrorToast("Error al cargar los usuarios.");
      }
    };
    fetchUsers();
  }, []);

  const toggleUserStatus = async (username, enable) => {
    try {
      await axios.put(`/api/users/admin/status`, { enabled: enable });
      showSuccessToast(
        `Usuario ${enable ? "habilitado" : "deshabilitado"} correctamente.`
      );
    } catch (error) {
      showErrorToast("Error al cambiar el estado del usuario.");
    }
  };

  const deleteUser = async (user_id) => {
    try {
      await axios.delete(`/api/users/${user_id}`);
      setUsers(users.filter((user) => user.id !== user_id));
      showSuccessToast("Usuario eliminado correctamente.");
    } catch (error) {
      showErrorToast("Error al eliminar el usuario.");
    }
  };
  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);
  return (
    <div className="relative sm:w-[70vw] bg-black border-solid border-2 border-black rounded-3xl place-content-center">
      <Header />
      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-full h-[90vh] sm:h-[90vh] sm:flex-row">
        <div className="flex flex-col md:flex-row w-full md:w-[55vw] h-[75vh] md:h-full pb-20 rounded-bl-3xl text-center text-lg md:text-2xl bg-white">
          <div className="flex justify-start items-center md:bg-fondo rounded-bl-3xl md:h-[90vh] p-4 md:w-[24vw] lg:w-[20vw] md:space-y-20">
            <button
              className="rounded-3xl text-center text-xl lg:text-2xl text-white bg-black h-[7vh] w-[22vw] md:w-[15vw] lg:w-[16vw] transition duration-200"
              onClick={() => navigate("/admin-profile")}
            >
              Volver
            </button>
          </div>

          <h1 className="flex justify-evenly content-center w-full h-full text-2xl lg:text-3xl font-bold p-0 md:p-4">
            VISUALIZAR USUARIOS
          </h1>
        </div>
        <div className="flex flex-col items-center md:justify-end md:bg-fondo rounded-br-3xl h-[8vh] md:h-full py-4 md:w-[22vw] lg:w-[20vw] md:space-y-20">
          <button
            type="button"
            onClick={() => toggleUserStatus(currentUser.username, false)}
            className="rounded-3xl text-center text-xl lg:text-2xl text-white bg-black h-[7vh] [12vw] md:w-[15vw] lg:w-[16vw] transition duration-200"
          >
            Deshabilitar
          </button>
          <button
            type="button"
            onClick={() => toggleUserStatus(currentUser.username, true)}
            className="rounded-3xl text-center text-xl lg:text-2xl text-white bg-black h-[7vh] w-[12vw] md:w-[15vw] lg:w-[16vw] transition duration-200"
          >
            Habilitar
          </button>
          <button
            type="button"
            onClick={() => deleteUser(currentUser.user_id)}
            className="rounded-3xl text-center text-xl lg:text-2xl text-white bg-black h-[7vh] w-[12vw] md:w-[15vw] lg:w-[16vw] transition duration-200"
          >
            Eliminar
          </button>
        </div>
      </section>
    </div>
  );
};

export default Administrator;
