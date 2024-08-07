import ProfileLayout from "../layouts/ProfileLayout.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import EditPassword from "../components/EditPassword.jsx";
import { FaCamera, FaPen, FaSave } from "react-icons/fa";
import { toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [avatarUrl, setAvatarUrl] = useState("/avatarDefault.jpg");

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}users/profile`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
        }
      );
      
      const result = await response.json();
      setUserData(result.users);
    } catch (error) {
      console.log("error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [apiUrl]);

  const updateUsername = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}users/profile/username`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newUsername }),
        }
      );

      if (!response.ok) {
        console.error("Error al actualizar el nombre de usuario");
        toast.error("Error al actualizar el nombre de usuario"); // Notificación de error
        return;
      } else {
        toast.success("Nombre de usuario actualizado con éxito"); // Notificación de éxito
        await fetchUserData()
      }
    } catch (error) {
      console.log("Error al actualizar los datos:", error);
      toast.error("Error al actualizar los datos"); // Notificación de error
    }
  };

  const updateAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      // Crear una URL temporal para mostrar el avatar actualizado
      const tempAvatarUrl = URL.createObjectURL(file);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}users/profile/avatar`,
          {
            method: "POST",
            headers: {
              Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
            },
            body: formData,
          }
        );
        if (!response.ok) {
          console.log("Error al actualizar el avatar:");
          toast.error("Error al actualizar el avatar"); // Notificación de error          
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
            noValidate
            className="flex flex-col items-center w-full h-full justify-evenly content-center
          text-base sm:text-lg md:text-2xl "
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold p-8">MI PERFIL</h1>

            <div className="flex justify-center pb-4 relative">
              <img
                src={(userData.avatar ? `${apiUrl}/${userData.avatar}` : "/avatarDefault.jpg")}
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
                placeholder={currentUser?.email}
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3 bg-white border-2 border-black text-neutral-500"
              />
            </div>
            <div className="flex flex-col py-4 relative">
              <label htmlFor="newUsername">Nombre de usuario:</label>
              <input
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3 bg-white border-2 border-black text-neutral-500 "
                type="text"
                placeholder={userData?.username}
                onChange={(e) => setNewUsername(e.target.value)}
                name="newUsername"
                id="newUsername"
                required
              />
              <div
                onClick={() => {
                  updateUsername();
                }}
                className="absolute top-12 md:top-14 right-5 cursor-pointer"
              >
                <FaSave />
              </div>
            </div>
            <div className="flex flex-col py-4 relative ">
              <label>Contraseña:</label>
              <input
                readOnly
                className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3   bg-white border-2 border-black text-neutral-500 "
                type="password"
                placeholder="********"
                onClick={() => {
                  setEditPassword(true);
                }}
                name="password"
                id="password"
              />
              <div
                onClick={() => {
                  setEditPassword(true);
                }}
                className="absolute top-12 md:top-14 lg:top-14 right-5  cursor-pointer"
              >
                <FaPen />
              </div>
            </div>
          </form>
        </div>
      )}

      {editPassword && <EditPassword setEditPassword={setEditPassword} />}
    </ProfileLayout>
  );
};
export default UserProfile;
