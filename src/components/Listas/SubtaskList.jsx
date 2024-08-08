import { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */

// const sortingOptions = [
//   { value: "default", label: "Ordenar por defecto" },
//   { value: "checked", label: "Ordenar por completado" },
//   { value: "unchecked", label: "Ordenar por pendiente" },
// ];

const SubtaskList = ({
  subtasks,
  handleDeleteSubtask,
  handleToggleSubtask,
}) => {
  const navigate = useNavigate();
  const { selectedEvent, setSelectedEvent } = useAuth();
  console.log(subtasks);

  const [sortBy, setSortBy] = useState("default");
  const { title, description } = selectedEvent;

  return (
    <div className="flex flex-col col-span-4 items-center md:ml-20 rounded-bl-lg p-4 md:col-span-8 ">
      <div className="pt-8 pb-6 flex flex-col mt-5 items-center bg-amber-950 md:h-[20vh] md:w-[30vw] border-solid border-2 border-black border-b-0 rounded-t-3xl space-y-4">
        <h2 className="flex flex-col text-center text-3xl mx-14  font-bold text-white ">
          {title}
        </h2>
        <p className="text-white">{description}</p>
      </div>
      <div className=" items-center bg-amber-950 h-[30vh] md:h-[70vh] md:w-[30vw] border-solid border-2 border-black rounded-lg">
        <ul className=" items-center m-5 bg-fondo shadow-lg rounded-lg p-6 border-2 h-[25vh] md:h-[60vh] border-amber-300  max-h-[70vh] overflow-y-auto">
          
          {subtasks ? (
            <>
              {subtasks.map((subtask) => {
                return (
                  <li
                    key={subtask.subtask_id}
                    className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 border-b border-dotted border-gray-300"
                  >
                    <span className="text-gray-800 text-sm md:text-base">
                      <label
                        className={`${subtask.done ? "line-through" : ""}`}
                      >
                        <input
                          onChange={() =>
                            handleToggleSubtask(subtask.subtask_id)
                          }
                          checked={subtask.done}
                          type="checkbox"
                          className="mr-2"
                          aria-label={`Mark ${subtask.title} as completed`}
                        />
                        {subtask.title}
                      </label>
                    </span>
                    <button
                      onClick={() => handleDeleteSubtask(subtask.subtask_id)}
                      className=" bg-white hover:bg-yellow-100 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                      aria-label={`Delete ${subtask.title}`}
                    >
                      ❌
                    </button>
                  </li>
                );
              })}
            </>
          ) : (
            <p>no hay tareas</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SubtaskList;
