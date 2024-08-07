import MainLayout from "../layouts/MainLayout.jsx";
import { useEffect, useState } from "react";
import Sidebar from "../components/Listas/Sidebar.jsx";
import { initialSubtasks } from "../lib/constants.js";
import SubtaskList from "../components/Listas/SubtaskList.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const Listas = () => {
  const { selectedEvent, setSelectedEvent } = useAuth();
  const navigate = useNavigate();

  const [subtasks, setSubtasks] = useState();
  const [reload, setreload] = useState(true);
  // const handleAddSubtask = (newSubtaskText) => {
  //   const newSubtask = {
  //     id: subtasks.length + 1,
  //     name: newSubtaskText,
  //     checked: false,
  //   };
  //   const newSubtasks = [...subtasks, newSubtask];
  //   setSubtasks(newSubtasks);
  //   setreload(!reload);
  // };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      console.log(subtaskId);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/subtask/${subtaskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "DELETE",
        }
      );
      const info = await response.json();

      setreload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleSubtask = async (subtaskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/subtask/${subtaskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "POST",
        }
      );
      const info = await response.json();

      setreload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllSubtasks = async (task_id) => {
    try {
      console.log(task_id);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/${task_id}/subtask`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "DELETE",
        }
      );
      const info = await response.json();

      setreload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAllAsFinished = () => {
    const newSubtasks = subtasks.map((subtask) => {
      return {
        ...subtask,
        checked: true,
      };
    });
    setSubtasks(newSubtasks);
  };

  const handleMarkAllAsUnfinished = () => {
    const newSubtasks = subtasks.map((subtask) => {
      return {
        ...subtask,
        checked: false,
      };
    });
    setSubtasks(newSubtasks);
  };
  const getTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/${selectedEvent.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "GET",
        }
      );
      const info = await response.json();

      setSubtasks(info.subTasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    !selectedEvent && navigate("/calendar");
  }, [reload]);
  useEffect(() => {
    getTasks();
  }, [reload]);

  return selectedEvent ? (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between w-[80vw] h-full rounded-b-3xl bg-fondo ">
        <SubtaskList
          className=" "
          handleDeleteSubtask={handleDeleteSubtask}
          handleToggleSubtask={handleToggleSubtask}
          subtasks={subtasks}
        />
        <Sidebar
          className=""
          handleRemoveAllSubtasks={handleRemoveAllSubtasks}
          handleMarkAllAsFinished={handleMarkAllAsFinished}
          handleMarkAllAsUnfinished={handleMarkAllAsUnfinished}
          subtasks={subtasks}
          setSubtasks={setSubtasks}
          reload={reload}
          setreload={setreload}
        />
      </div>
    </MainLayout>
  ) : (
    navigate("/calendar")
  );
};

export default Listas;
