import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Extiende dayjs con los plugins customParseFormat y utc
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const localizer = dayjsLocalizer(dayjs);
  const [vista, setView] = useState("day");
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
      start: startDate,
      end: endDate,
      title: task.title,
    };
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white flex flex-col w-[80vw] sm:basis-1/2 h-full rounded-b-3xl space-y-4  font-bold text-lg md:text-3xl ">
      <div className=" flex justify-evenly w-full h-20">
        <button
          onClick={() => {
            setView("day");
          }}
        >
          dia
        </button>
        <button
          onClick={() => {
            setView("week");
          }}
        >
          semana
        </button>
        <button
          onClick={() => {
            setView("month");
          }}
        >
          mes
        </button>
      </div>
      <div className="bg-white p-1 w-[80vw] h-[700px]">
        <Calendar
          className="w-[80vw]"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={""}
          view={vista}
          onView={(view) => setView(view)}
        />
      </div>

      <button>Añadir evento</button>
    </div>
  );
};

export default ListTask;
