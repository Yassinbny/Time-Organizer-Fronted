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
  const handleAddSubtask = (newSubtaskText) => {
    const newSubtask = {
      id: subtasks.length + 1,
      name: newSubtaskText,
      checked: false,
    };
    const newSubtasks = [...subtasks, newSubtask];
    setSubtasks(newSubtasks);
    setreload(!reload);
  };

  const handleDeleteSubtask = (subtaskId) => {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== subtaskId);
    setSubtasks(newSubtasks);
  };

  const handleToggleSubtask = async (subtaskId) => {
    try {
      console.log(subtaskId);

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
      console.log(info);

      setreload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllSubtasks = () => {
    setSubtasks([]);
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
    getTasks();
  }, [selectedEvent, reload]);
  // useEffect(() => {
  //   localStorage.setItem("subtasks", JSON.stringify(subtasks));
  // }, [subtasks]);
  return (
    <MainLayout>
      <div className="flex flex-row min-w-full">
        <SubtaskList
          className="flex-1 min-w-full"
          handleDeleteSubtask={handleDeleteSubtask}
          handleToggleSubtask={handleToggleSubtask}
          subtasks={subtasks}
        />
        <Sidebar
          className="flex-1 min-w-full"
          handleAddSubtask={handleAddSubtask}
          handleRemoveAllSubtasks={handleRemoveAllSubtasks}
          handleMarkAllAsFinished={handleMarkAllAsFinished}
          handleMarkAllAsUnfinished={handleMarkAllAsUnfinished}
          subtasks={subtasks}
        />
      </div>
    </MainLayout>
  );
};

export default Listas;
