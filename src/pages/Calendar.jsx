import MainLayout from "../layouts/MainLayout.jsx";
import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SelectedEvent from "../components/SelectedEvent.jsx";
import AddTask from "../components/AddTask.jsx";
import "dayjs/locale/es";
import RateTask from "../components/RateTask.jsx";
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";
import FilterModal from "../components/FilterModal.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const MyCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const localizer = dayjsLocalizer(dayjs);
  const [vista, setVista] = useState("day");
  const { selectedEvent, setSelectedEvent } = useAuth();
  const [addTask, setAddTask] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [family, setFamily] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  async function getData() {
    try {
      let queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (color) queryParams.append("color", color);
      if (family) queryParams.append("family", family);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks?${queryParams.toString()}`,
        {
          headers: { Authorization: localStorage.getItem("AUTH_TOKEN_TJ") },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data.tasks);

      setSearch("");
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener las tareas"); // Mostrar un mensaje de error
    }
  }

  const events = tasks.map((task) => {
    const startDate = dayjs.utc(task.start_on).local().toDate();
    const endDate = dayjs.utc(task.finish_on).local().toDate();

    return {
      id: task.task_id,
      description: task.description,
      start: startDate,
      end: endDate,
      title: task.title,
      done: task.done,
      family: task.family_name,
      color: task.color_name,
      rating: task.rating,
    };
  });

  useEffect(() => {
    getData();
  }, [addTask, selectedEvent, filterModal]);
  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);

  const components = {
    event: (e) => {
      return (
        <div className="flex flex-row justify-between">
          <h4>{e.title}</h4>
          <p className="no-underline">{e.event.rating?e.event.rating:""}</p>
          <p
            className={`${
              e.event.color == "black" ? "text-white" : "text-black"
            }`}
          >
            {e.event.family}
          </p>
        </div>
      );
    },
  };

  const notify = (message) => toast.warning(message); // Usa toast para mostrar una notificación

  useEffect(() => {
    if (
      selectedEvent &&
      selectedEvent.done !== 0 &&
      selectedEvent.rating !== null
    ) {
      notify("Esta tarea ya ha sido calificada"); // Mostrar una advertencia
    }
  }, [selectedEvent]);

  return (
    <MainLayout>
      <div
        className="  flex sm:flex-col sm:bg-fondo sm:w-[20vw] rounded-bl-3xl md:w-[15vw] sm:text-2xl md:text-4xl
       sm:h-full justify-evenly sm:justify-center sm:space-y-4 md:space-y-20 mt-12 sm:mt-0 "
      >
        <div className="flex  flex-col justify-center items-center relative">
          <img
            className="absolute w-[12vw] "
            src="images\detalles_dia-removebg-preview.png"
            alt="imagen"
          />
          <button
            className="relative z-30"
            onClick={() => {
              setVista("day");
            }}
          >
            Dia
          </button>
        </div>
        <div className="flex  flex-col justify-center items-center relative">
          <img
            className="absolute w-[12vw]"
            src="images\detalles_semana.png"
            alt=""
          />
          <button
            className="relative z-30"
            onClick={() => {
              setVista("work_week");
            }}
          >
            Semana
          </button>
        </div>
        <div className="flex  flex-col justify-center items-center relative">
          <img
            className="absolute w-[12vw]"
            src="images\detalles_mes-removebg-preview.png"
            alt=""
          />
          <button
            className="relative z-30"
            onClick={() => {
              setVista("month");
            }}
          >
            Mes
          </button>
        </div>
      </div>
      <div className="bg-white p-1 w-full h-[60vh] flex flex-col items-center content-center md:text-lg  sm:w-[50vw] sm:h-[90vh] ">
        <Calendar
          className="w-full h-full text-center flex "
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={""}
          view={vista}
          onView={(view) => setVista(view)}
          selectable
          onSelectEvent={(event) => {
            setSelectedEvent(event);
          }}
          components={components}
          culture="es"
          eventPropGetter={(event) => {
            const backgroundColor = event.color ? event.color : "white";
            const textDecoration = event.done ? "line-through" : "none";
            const textDecorationStyle = event.done ? "solid" : "";
            const textDecorationColor = event.done ? "black" : "";
            const textDecorationThickness = event.done ? "4px" : ""; // Ajusta el grosor aquí
            const color = event.color === "white" ? "black" : "white"; // Opcional, para mejor contraste

            return {
              style: {
                backgroundColor,
                textDecoration,
                textDecorationStyle,
                textDecorationColor,
                textDecorationThickness,
                color,
              },
            };
          }}
        />
      </div>
      <div className="flex flex-wrap space-y-6 sm:flex-col justify-center items-center sm:bg-fondo sm:text-2xl rounded-br-3xl sm:justify-end h-[20vh] sm:py-4 sm:h-full sm:w-[14vw] ">
        <button
          className=" rounded-3xl text-2xl w-[60vw] sm:text-2xl text-center bg-black text-white sm:w-[9vw] md:text-3xl h-[7vh] sm:h-[9vh]  transition duration-200"
          onClick={() => {
            setAddTask(true);
          }}
        >
          Crear evento
        </button>
        <button
          className=" rounded-3xl text-2xl w-[60vw] sm:text-2xl text-center bg-black text-white sm:w-[9vw] md:text-3xl h-[7vh] sm:h-[9vh] transition duration-200"
          onClick={() => {
            setFilterModal(true);
          }}
        >
          Filtrar
        </button>
      </div>
      {selectedEvent &&
        (selectedEvent.done == 0 ? (
          <SelectedEvent
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        ) : selectedEvent.rating == null ? (
          <RateTask
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        ) : (
          ""
        ))}
      {addTask && <AddTask setAddTask={setAddTask} />}
      {filterModal && (
        <FilterModal
          setSearch={setSearch}
          setColor={setColor}
          setFamily={setFamily}
          setFilterModal={setFilterModal}
        />
      )}
      <ToastContainer />
    </MainLayout>
  );
};

export default MyCalendar;
