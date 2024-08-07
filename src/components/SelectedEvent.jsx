import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils"; // Importa tus funciones de toastUtils
import { useNavigate } from "react-router-dom";

const SelectedEvent = ({ selectedEvent, setSelectedEvent }) => {
  const [title, setTitle] = useState(selectedEvent.title);
  const [description, setDescription] = useState(selectedEvent.description);
  const [start, setStart] = useState(selectedEvent.start);
  const [end, setEnd] = useState(selectedEvent.end);
  const [id, setId] = useState(selectedEvent.id);

  let formInfo = {
    task_id: id,
    title: title,
    description: description,
    start_on: start,
    finish_on: end,
  };
  const [body, setBody] = useState(formInfo);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!title.trim()) {
      showErrorToast("El título no puede estar vacío");
      return false;
    }

    if (!description.trim()) {
      showErrorToast("La descripción no puede estar vacía");
      return false;
    }

    if (!start || !end) {
      showErrorToast("Las fechas y horas son requeridas");
      return false;
    }

    if (new Date(end) < new Date(start)) {
      showErrorToast(
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/${formInfo.task_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );
      const { ok, error } = await response.json();

      if (!ok) {
        showErrorToast(error);
        return;
      }
      showSuccessToast("Tarea actualizada con éxito");
      setSelectedEvent();
    } catch (error) {
      console.log(error);
      showErrorToast("Error al actualizar la tarea");
    }
  };

  const HandleFinishTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/${formInfo.task_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "POST",
        }
      );
      const { ok, error } = await response.json();

      if (!ok) {
        showErrorToast(error);
        return;
      }
      showSuccessToast("Tarea finalizada con éxito");
      setSelectedEvent();
    } catch (error) {
      console.log(error);
      showErrorToast("Error al finalizar la tarea");
    }
  };

  useEffect(() => {
    setBody(formInfo);
  }, [title, description, start, end]);

  return (
    <div
      className="fixed -inset-y-0 -inset-x-0 z-30 flex flex-col items-center justify-center
      w-[100vw] h-[100vh] bg-gray-800 bg-opacity-85"
    >
      <h2
        className="bg-fondoPopup text-3xl pt-4 text-white rounded-t-2xl w-[70vw] md:w-[50vw]
      sm:w-[60vw] text-center sm:text-6xl"
      >
        Modificar tarea
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  justify-evenly sm:justify-center space-y-12 content-center
         sm:text-4xl  bg-fondoPopup
         p-6 rounded-b-2xl shadow-lg  w-[70vw] sm:w-[60vw] md:w-[50vw] h-[70vh] md:h-[80vh] text-center"
      >
        <input
          type="text"
          className="text-3xl bg-transparent text-gray-400 w-full border-b-4 text-center sm:text-6xl font-bold mb-4"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setBody(formInfo);
          }}
        />
        <input
          type="text"
          className="mb-4 w-full bg-transparent text-gray-400 border-b-4 sm:text-5xl  text-xl text-center"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setBody(formInfo);
          }}
        />

        <div className="flex flex-col text-gray-400 space-y-4 sm:space-y-0 sm:flex-row">
          <div>
            <label className="mb-2">
              <strong>Fecha de Inicio:</strong>
            </label>
            <input
              className="w-[46vw] bg-transparent text-gray-400 sm:w-[23vw]"
              type="datetime-local"
              value={dayjs(start).format("YYYY-MM-DDTHH:mm")}
              min={"1900-01-01T00:00:00"}
              max={"2040-01-01T00:00:00"}
              onChange={(e) => {
                setStart(e.target.value);
                setBody(formInfo);
              }}
              disabled
            />
          </div>
          <div>
            <label className="mb-2 text-gray-400">
              <strong>Fecha de Fin:</strong>
            </label>
            <input
              className="w-[46vw] bg-transparent text-gray-400 sm:w-[23vw]"
              type="datetime-local"
              value={dayjs(end).format("YYYY-MM-DDTHH:mm")}
              min={dayjs(start).format("YYYY-MM-DDTHH:mm")}
              max={"2040-01-01T00:00:00"}
              onChange={(e) => {
                setEnd(e.target.value);
                setBody(formInfo);
              }}
            />
          </div>
        </div>
        <div className="grid grid-flow-col grid-rows-2 gap-4 sm  ">
          <button
            className="bg-[url('/avatarDefault.jpg')] bg-cover bg-top  py-2 rounded-2xl hover:bg-green-900 w-[25vw] sm:w-[20vw] sm:text-2xl md:h-[10vh] md:text-4xl   transition duration-200"
            onClick={() => {
              setSelectedEvent();
            }}
          >
            Cerrar
          </button>

          <button
            type="submit"
            className="bg-[url('/avatarDefault.jpg')] bg-cover bg-top px-4 py-2 rounded-2xl hover:bg-green-900 w-[25vw]  sm:w-[20vw] sm:text-2xl md:h-[10vh] md:text-4xl transition duration-200"
          >
            Actualizar
          </button>
          <button
            className="bg-[url('/avatarDefault.jpg')] bg-cover bg-right  px-4 py-2 rounded-2xl hover:bg-green-900 w-[25vw]  sm:w-[20vw] sm:text-2xl md:h-[10vh] md:text-4xl transition duration-200"
            onClick={(e) => {
              HandleFinishTask(e);
            }}
          >
            Finalizar
          </button>
          <button
            className="bg-[url('/avatarDefault.jpg')] bg-cover bg-right  px-4 py-2 rounded-2xl hover:bg-green-900 w-[25vw]  sm:w-[20vw] sm:text-2xl md:h-[10vh] md:text-4xl transition duration-200"
            onClick={(e) => {
              navigate("/list");
            }}
          >
            Detalle
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectedEvent;
