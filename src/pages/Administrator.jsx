import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils"; // Importa las funciones de notificación
import { toast } from "react-toastify";

const Administrator = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);
  const [reload, setreload] = useState(true);
  const columns = [
    {
      name: "Última conexión",
      selector: (row) => row.updatedAt,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}users/`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
            },
          }
        );
        const result = await response.json();
        setUsers(result.users);
      } catch (error) {
        showErrorToast("Error al cargar los usuarios.");
      }
    };
    fetchUsers();
  }, [reload]);

  const toggleUserStatus = async (username, enabled) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}users/${username}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          body: JSON.stringify({ status: enabled }),
        }
      );
      setreload(!reload);
      toast.success(
        `Usuario ${enabled ? "habilitado" : "deshabilitado"} correctamente.`
      );
    } catch (error) {
      toast.error("Error al cambiar el estado del usuario.");
    }
  };

  const deleteUser = async (user_id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}users/${user_id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
        },
      });
      setUsers(users.filter((user) => user.id !== user_id));
      setreload(!reload);
      toast.success("Usuario eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el usuario.");
    }
  };

  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser, navigate]);

  const handleSelected = ({ selectedRows }) => {
    setUsersSelected(selectedRows[0]);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.enabled === 0,
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        color: "#f56565",
      },
    },
  ];

  return (
    <div className="relative sm:w-[70vw] bg-black border-solid border-2 border-black rounded-3xl place-content-center">
      <Header />
      <section className="flex flex-col rounded-3xl w-[80vw] sm:w-full h-[90vh] sm:h-[90vh] sm:flex-col md:flex-row">
        <div className="flex flex-col md:flex-row w-full md:w-[50vw] h-[75vh] md:h-full pb-20 rounded-bl-3xl text-center text-lg md:text-2xl bg-white">
          <div className="flex justify-start items-end md:bg-fondo rounded-bl-3xl md:h-[90vh] p-4 lg:pb-10 md:w-[24vw] lg:w-[20vw] md:space-y-20">
            <button
              className="rounded-3xl text-center text-xl lg:text-2xl text-white bg-black h-[7vh] w-[22vw] md:w-[15vw] lg:w-[16vw] transition duration-200"
              onClick={() => navigate("/admin-profile")}
            >
              Volver
            </button>
          </div>
          <div className="flex  flex-col h-full w-full md:w-[30vw] justify-evenly content-center overflow-x-scroll">
            <div>
              <DataTable
                title="VISUALIZAR USUARIOS"
                columns={columns}
                data={users}
                selectableRows
                pagination
                paginationPerPage={8}
                fixedHeader
                responsive
                clearSelectedRows
                selectableRowsSingle={true}
                onSelectedRowsChange={handleSelected}
                conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:justify-end md:bg-fondo rounded-br-3xl h-[8vh] md:h-full py-4 md:w-[22vw] lg:w-[20vw] md:space-y-20 md:pb-8 lg:pb-10">
          <button
            type="button"
            onClick={() => toggleUserStatus(usersSelected.username, false)}
            className="rounded-3xl text-xl lg:text-2xl text-red-400 md:text-white bg-black md:h-[7vh] md:w-[14vw] lg:w-[16vw] transition duration-200"
          >
            Deshabilitar
          </button>
          <button
            type="button"
            onClick={() => toggleUserStatus(usersSelected.username, true)}
            className="rounded-3xl text-xl lg:text-2xl text-red-400 md:text-white bg-black md:h-[7vh] md:w-[14vw] lg:w-[16vw] transition duration-200"
          >
            Habilitar
          </button>
          <button
            type="button"
            onClick={() => deleteUser(usersSelected.user_id)}
            className="rounded-3xl text-xl lg:text-2xl text-red-400 md:text-white bg-black md:h-[7vh] md:w-[14vw] lg:w-[16vw] transition duration-200"
          >
            Eliminar
          </button>
        </div>
      </section>
    </div>
  );
};

export default Administrator;
