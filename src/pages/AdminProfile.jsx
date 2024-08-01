
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import useForm from "../hooks/useForm.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SlPencil, SlCamera } from "react-icons/sl";
import EditPassword from "../components/EditPassword.jsx";


const AdminProfile = () => {
  const [editPassword, setEditPassword] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formValues] = useForm({
    username: "",
    email: "",
    password: "",
    avatar:"",
  });
  const { username, email, password, avatar } = formValues;

  const fetchUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/profile/admin`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        body: JSON.stringify(formValues),
      });
      const { ok, error } = await response.json();

      if (!ok) {
        console.error(error);
        return;
      }
      
      navigate("/");
    } catch (error) {
      console.log("Error al actualizar los datos:", error);
    }
  };

  const avatarChange = async (e) => {
    const file = e.target.files[0];
    if(file) {
        const formData = new FormData();
        formData.append("avatar", file);
    
     try {
      await fetch(`http://localhost:3000/users/profile/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUserData();
     } catch (error) {
      console.log("Error al actualizar tu avatar:", error);
      }
    }
  };

  //Redirigir si el usuario ya está autentificado.
  useEffect(() => {
    fetchUserData();
  }, [currentUser, editPassword]);

  return (
    <ProfileLayout>
      <div className="flex justify-evenly w-full h-[50vh] content-center">
        <form
          onSubmit={fetchUserData}
          className="flex flex-col items-center 
           text-lg md:text-2xl"
        >
          <h1 className="text-2xl lg:text-3xl font-bold p-0 md:p-5">MI PERFIL</h1>
          
          <div className="flex flex-col pt-10 md:pt-5 relative">
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
              placeholder={currentUser?.username} 
              onChange={e => 
                fetchUserData("newUsername", e.target.value)}
              className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15 p-3 bg-white border-2 border-black "
            />
            <div
              onClick={(e) => {
                fetchUserData(e.target.value);
              }}
              className="absolute top-12 md:top-14 right-4 md:right-2 cursor-pointer">
              <SlPencil />  
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
              className="rounded-xl w-[250px] sm:w-[280px] md:w-[25vw] h-10 md:h-12 lg:h-15  p-3   bg-white border-2 border-black text-neutral-500 "
            />
            <div
              onClick={() => {
                setEditPassword(true);
                }}
              className="absolute top-12 md:top-14 right-4 md:right-2 cursor-pointer">
              <SlPencil />  
            </div>
          </div>
          <div className="flex flex-col py-4 relative">
            <label htmlFor="">Avatar:</label>
            <input
              className="rounded-full lg:h-[130px] h-[100px] w-[100px] lg:w-[130px] p-3  bg-white border-2 border-black "
              type="file"
              value={avatar}
              onChange={avatarChange}
              name="avatar"
              id="avatar"
              placeholder={avatar}
            />
            <div className="absolute bottom-1 lg:bottom-3 -right-1 lg:-right-2 cursor-pointer">
              <SlCamera onClick={() => document.getElementById('avatar').click()} />
            </div>
          </div>

          <div className="flex justify-evenly content-center p-2">
            <label htmlFor="">Permisos Administrador:</label>
            <button className="content-center rounded-3xl text-xl w-[30vw] text-center bg-black text-white md:text-2xl h-[7vh]  transition duration-200"
            onClick={() => navigate("/administrator")}>
            Visualizar Usuarios
            </button>
          </div>
        </form>
      </div>

      {editPassword && <EditPassword setEditPassword={setEditPassword} />}

    </ProfileLayout>
  );
};

export default AdminProfile;