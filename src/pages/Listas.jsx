import MainLayout from "../layouts/MainLayout.jsx"
import { useEffect, useState } from "react";
import Sidebar from "../components/Listas/Sidebar.jsx"
import { initialSubtasks } from "../lib/constants.js";
import SubtaskList from "../components/Listas/SubtaskList.jsx";

const Listas = () => {
    const [subtasks, setSubtasks] = useState(() => {
        return JSON.parse(localStorage.getItem("subtasks")) || initialSubtasks;
      });
      const handleAddSubtask = (newSubtaskText) => {
        const newSubtask = {
          id: subtasks.length + 1,
          name: newSubtaskText,
          checked: false,
        }
        const newSubtasks = [...subtasks, newSubtask]
        setSubtasks(newSubtasks);
      }
    
      const handleDeleteSubtask = (subtaskId) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== subtaskId);
        setSubtasks(newSubtasks);
      }
    
      const handleToggleSubtask = (subtaskId) => {
        const newSubtasks = subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return {
              ...subtask,
              checked: !subtask.checked,
            }
          }
          return subtask;
        })
        setSubtasks(newSubtasks);
      }
    
      const handleRemoveAllSubtasks = () => {
        setSubtasks([]);
      }
    
      const handleMarkAllAsFinished = () => {
        const newSubtasks = subtasks.map((subtask) => {
          return {
            ...subtask,
            checked: true,
          }
        })
        setSubtasks(newSubtasks);
      }
    
      const handleMarkAllAsUnfinished = () => {
        const newSubtasks = subtasks.map((subtask) => {
          return {
            ...subtask,
            checked: false,
          }
        })
        setSubtasks(newSubtasks);
      }
    
    useEffect(() => {
      localStorage.setItem("subtasks", JSON.stringify(subtasks));
    }, [subtasks]);
  return (
    <MainLayout>
        
      <SubtaskList handleDeleteSubtask={handleDeleteSubtask} handleToggleSubtask={handleToggleSubtask} subtasks={subtasks} />
      <Sidebar 
        handleAddSubtask={handleAddSubtask} 
        handleRemoveAllSubtasks={handleRemoveAllSubtasks} 
        handleMarkAllAsFinished={handleMarkAllAsFinished} 
        handleMarkAllAsUnfinished={handleMarkAllAsUnfinished} 
        subtasks={subtasks} 
      />
    
      
    </MainLayout>
  )
}

export default Listas
