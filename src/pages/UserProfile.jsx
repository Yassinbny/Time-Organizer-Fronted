import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import useAuth from "../hooks/useAuth.jsx";
import EditPassword from "../components/EditPassword.jsx";
import { SlPencil, SlCamera } from "react-icons/sl";
import { toast, ToastContainer } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [editPassword, setEditPassword] = useState(false);

  const fetchUserData = async (name, value) => {
    if (name === "newUsername") setNewUsername(value);

    try {
      const response = await fetch(
        `http://localhost:3000/users/profile/username`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newUsername }),
        }
      );
      const { ok, error } = await response.json();

      if (!ok) {
        console.error(error);
        toast.error("Error al actualizar el nombre de usuario"); // Notificación de error
        return;
      }
      toast.success("Nombre de usuario actualizado con éxito"); // Notificación de éxito
      navigate("/user-profile");
    } catch (error) {
      console.log("Error al actualizar los datos:", error);
      toast.error("Error al actualizar los datos"); // Notificación de error
    }
  };

  const avatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch(
          `http://localhost:3000/users/profile/avatar`,
          {
            method: "POST",
            headers: {
              Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
            },
            body: formData,
          }
        );
        const result = await response.json();
        if (!response.ok) {
          toast.error("Error al actualizar el avatar"); // Notificación de error
          return;
        }
        toast.success("Avatar actualizado con éxito"); // Notificación de éxito
      } catch (error) {
        console.log("Error al actualizar tu avatar:", error);
        toast.error("Error al actualizar tu avatar"); // Notificación de error
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);
  return (
    <ProfileLayout>
      <div className="flex justify-evenly w-full h-full content-center">
        <form
          noValidate
          className="flex flex-col items-center w-full h-full justify-evenly content-center text-base sm:text-lg md:text-2xl "
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold p-12">MI PERFIL</h1>

          <div className="flex flex-col space-y-4 relative">
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
            <label htmlFor="newUsername">Nombre de usuario:</label>
            <input
              className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 sm:h-12 md:h-20 p-3 bg-white border-2 border-black text-neutral-500"
              type="text"
              placeholder={currentUser?.username}
              onChange={(e) => fetchUserData("newUsername", e.target.value)}
              name="newUsername"
              id="newUsername"
              required
            />
            <div
              onChange={(e) => {
                fetchUserData(e.target.value);
              }}
              className="absolute top-9 md:top-14 right-5 cursor-pointer"
            >
              <SlPencil />
            </div>
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label>Contraseña:</label>
            <input
              readOnly
              className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 sm:h-12  md:h-20  p-3   bg-white border-2 border-black text-neutral-500"
              type="password"
              value="********"
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
              className="absolute top-9 md:top-14 lg:top-12 right-5  cursor-pointer"
            >
              <SlPencil />
            </div>
          </div>

          <div className="flex flex-col space-y-4 relative">
            <label htmlFor="">Avatar:</label>
            <input
              className="rounded-full lg:h-[150px] h-[120px] w-[120px] lg:w-[150px] p-3  bg-white border-2 border-black"
              type="file"
              onChange={avatarChange}
              name="avatar"
              id="avatar"
            />
            <div className="absolute -bottom-2 -right-2 cursor-pointer">
              <SlCamera
                onClick={() => document.getElementById("avatar").click()}
              />
            </div>
          </div>
        </form>
      </div>
      {editPassword && <EditPassword setEditPassword={setEditPassword} />}
      <ToastContainer /> {/* Agrega el ToastContainer aquí */}
    </ProfileLayout>
  );
};

export default UserProfile;
