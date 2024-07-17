import MainLayout from "../layouts/MainLayout.jsx";
import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SelectedEvent from "../components/SelectedEvent.jsx";
import AddTask from "../components/AddTask.jsx";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const MyCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const localizer = dayjsLocalizer(dayjs);
  const [vista, setVista] = useState("day");
  const [selectedEvent, setSelectedEvent] = useState();
  const [addTask, setAddTask] = useState(false);
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
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
    };
  });

  useEffect(() => {
    getData();
  }, [addTask, selectedEvent]);

  return (
    <MainLayout>
      <div
        className="  flex sm:flex-col sm:bg-fondo sm:w-[20vw]  md:w-[10vw] sm:text-2xl md:text-4xl
       sm:h-full justify-evenly sm:justify-center sm:space-y-4 md:space-y-8 mt-12 sm:mt-0 "
      >
        <button
          className=""
          onClick={() => {
            setVista("day");
          }}
        >
          dia
        </button>
        <button
          onClick={() => {
            setVista("week");
          }}
        >
          semana
        </button>
        <button
          onClick={() => {
            setVista("month");
          }}
        >
          mes
        </button>
      </div>
      <div className="bg-white p-1 w-[78vw] h-[60vh]  sm:w-[40vw] sm:h-[80vh] ">
        <Calendar
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
            console.log(event);
          }}
        />
      </div>
      <div className="flex flex-col justify-end p-10 py-20 h-full ">
        <button
          className="mb-5  rounded-3xl text-4xl text-center bg-black text-white sm:w-[10vw] h-[7vh]  transition duration-200"
          onClick={() => {
            setAddTask(true);
          }}
        >
          Crear evento
        </button>
      </div>

      {selectedEvent && (
        <SelectedEvent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
      {addTask && <AddTask setAddTask={setAddTask} />}
    </MainLayout>
  );
};

export default MyCalendar;
