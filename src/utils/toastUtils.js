import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Función para mostrar notificaciones de error
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });
};

// Función para mostrar notificaciones de éxito
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
