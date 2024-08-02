import { toast } from 'react-toastify';

// Función para mostrar notificaciones de error
export const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};

// Función para mostrar notificaciones de éxito (opcional)
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};
