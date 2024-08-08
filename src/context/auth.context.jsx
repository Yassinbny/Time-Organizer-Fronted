import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// crear el contexto y darle un valor inicial
export const AuthContext = createContext({
  currentUser: "",
  signIn: (token = "") => {
    console.log(token);
  },
  signOut: () => {},
  recoverPassword: async (email) => {},
  changePassword: async (email, code, newPassword, confirmPassword) => {},
  selectedEvent: {},
  setSelectedEvent: () => {},
  navigate: () => {},
});

// crear el proveedor (provider) y luego implementarlo para envuelva a toda la aplicación (rutas)
export function AuthContextProvider({ children }) {
  // crear lo estados pertinentes y funciones que desee que estén disponibles en el contexto

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState();
  function signIn(token) {
    localStorage.setItem("AUTH_TOKEN_TJ", token);

    const user = jwtDecode(token);
    setCurrentUser(user);
  }

  function signOut() {
    localStorage.removeItem("AUTH_TOKEN_TJ");
    setCurrentUser(null);
  }

  async function recoverPassword(email) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/password/recover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Ajusta según cómo desees manejar el caso exitoso
        return { ok: true, message: "Correo de recuperación enviado." };
      } else {
        return { ok: false, message: responseData.message || "Error en la solicitud de recuperación." };
      }
    } catch (error) {
      return { ok: false, message: error.message || "Error en la solicitud de recuperación." };
    }
  }
  
  async function changePassword(email, code, newPassword, confirmPassword) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/password/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword, confirmPassword }),
      });

      const responseData = await response.json();

      if (!responseData.ok) {
        return { ok: false, message: responseData.message };
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || "Error en la solicitud de cambio de contraseña." };
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN_TJ");

    if (token) {
      const user = jwtDecode(token);

      if (user.exp * 1000 < Date.now()) {
        localStorage.removeItem("AUTH_TOKEN_TJ");
        navigate("/sign-in");
      } else {
        setCurrentUser(user);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key == "AUTH_TOKEN_TJ") {
        if (event.newValue) {
          const user = jwtDecode(event.newValue);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // retornar el context con su provider

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signOut,
        recoverPassword,
        changePassword,
        selectedEvent,
        setSelectedEvent,
        navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
