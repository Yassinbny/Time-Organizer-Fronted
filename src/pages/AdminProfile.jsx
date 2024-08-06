iimport ProfileLayout from "../layouts/ProfileLayout.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCamera, FaPen, FaSave } from "react-icons/fa";
import EditPassword from "../components/EditPassword.jsx";
import { toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [avatarUrl, setAvatarUrl] = useState("/avatarDefault.jpg");
  //const avatarUrl= userData.avatar ? `${apiUrl}/${userData.avatar}` : "/avatarDefault.jpg";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/profile/admin`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
        });
      
        const result = await response.json();
        //const avatarFromApi = userData.avatar;      
        //setAvatarUrl(avatarFromApi ? `${apiUrl}/${avatarFromApi}` : "/avatarDefault.jpg");
        console.log("+++++",result.users);
        setUserData(result.users);
      } catch (error) {
        console.log("error al obtener datos:", error);
      }
    };
    fetchUserData();
  }, [apiUrl]);


  const updateUsername = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/profile/username`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername }),
      });
      const { ok, error } = await response.json();

      if (!ok) {
        console.error(error);
        toast.error("Error al actualizar el nombre de usuario"); // Notificación de error
        return;
      }
      toast.success("Nombre de usuario actualizado con éxito"); // Notificación de éxito
      await AdminProfile();
    } catch (error) {
      console.log("Error al actualizar los datos:", error);
      toast.error("Error al actualizar los datos"); // Notificación de error
    }   
  };

  const updateAvatar = async (e) => {
    const file = e.target.files[0];
    if(file) {
      const formData = new FormData();
      formData.append("avatar", file);

      // Crear una URL temporal para mostrar el avatar actualizado
      const tempAvatarUrl = URL.createObjectURL(file);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/profile/avatar`, {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          body: formData,
        });
        if (!response.ok) {
          console.log("Error al actualizar el avatar:");
          toast.error("Error1 al actualizar el avatar"); // Notificación de error
          const avatarFromApi = userData.avatar;      
          setAvatarUrl(avatarFromApi ? `${apiUrl}/${avatarFromApi}` : "/avatarDefault.jpg");
          
        } else {
          await fetchUserData();
          toast.success("Avatar actualizado con éxito"); // Notificación de éxito
        }
      } catch (error) {
        console.log("Error al actualizar tu avatar:", error);
        const avatarFromApi = userData.avatar;      
        setAvatarUrl(avatarFromApi ? `${apiUrl}/${avatarFromApi}` : "/avatarDefault.jpg");
        toast.error("Error al actualizar tu avatar"); // Notificación de error
      }
      // Actualizar el estado del avatar
      setAvatarUrl(tempAvatarUrl);
      //setUserData();
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ProfileLayout>
      {userData && (
        <div className="flex justify-evenly w-full h-full content-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full h-full justify-evenly content-center
            text-base sm:text-lg md:text-2xl"
          >
            <h1 className="text-3xl lg:text-4xl font-bold pb-3 md:p-5">
              MI PERFIL
            </h1>

            <div className="flex justify-center pb-4 relative">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full object-cover  h-[120px] lg:h-[150px] w-[120px] lg:w-[150px] p-3  bg-white border-2 border-black top-10 md:top-12 left-0"            
              />
              <div>
                <label
                  htmlFor="avatar"
                  className="absolute bottom-3 -right-2 cursor-pointer"
                >
                  <FaCamera />
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={updateAvatar}
                />
              </div>
            </div>

            <div className="flex flex-col py-4 relative">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                readOnly
                type="email"
                name="email"
                id="email"
                value={currentUser?.email}
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3 bg-white border-2 border-black text-neutral-500"
              />
            </div>

            <div className="flex flex-col py-4 relative">
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder={userData?.username}
                onChange={(e) => setNewUsername(e.target.value)}
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3 bg-white border-2 border-black text-neutral-500"
                required
              />
              <div
                onClick={() => {
                  updateUsername();
                }}
                className="absolute top-12 md:top-14 right-4 md:right-3 cursor-pointer"
              >
                <FaSave />
              </div>
            </div>

            <div className="flex flex-col py-3 relative">
              <label>Contraseña:</label>
              <input
                readOnly
                type="password"
                name="password"
                id="password"
                placeholder="********"
                onClick={() => {
                  setEditPassword(true);
                }}
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15  p-3   bg-white border-2 border-black text-neutral-500"
              />
              <div
                onClick={() => {
                  setEditPassword(true);
                }}
                className="absolute top-12 md:top-14 right-4 md:right-3 cursor-pointer"
              >
                <FaPen />
              </div>
            </div>

            <div className="flex flex-col items-center py-2">
              <label htmlFor="">Permisos Administrador:</label>
              <button
                className="rounded-3xl w-[30vw] md:w-[25vw] text-center bg-black text-white text-xl lg:text-2xl h-[7vh] md:h-12 lg:h-15 transition duration-200"
                onClick={() => navigate("/administrator")}
              >
                Visualizar Usuarios
              </button>
            </div>
          </form>
        </div>
      )}
      
      {editPassword && <EditPassword setEditPassword={setEditPassword} />}
    </ProfileLayout>
  );
};

export default AdminProfile;
