/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button.jsx";
import Counter from "./Counter.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const AddSubtaskForm = ({
  subtasks,
  reload,
  setreload,
}) => {
  const [subtaskText, setSubtaskText] = useState("");
  const inputRef = useRef();
  const { selectedEvent } = useAuth();
  const { id } = selectedEvent;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!subtaskText) {
        toast.error("El campo no puede estar vacio");
        inputRef.current.focus();
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}tasks/${id}/subtask`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("AUTH_TOKEN_TJ"),
          },
          method: "POST",
          body: JSON.stringify({ title: subtaskText }),
        }
      );
      const res = await response.json();
      setSubtaskText("");
      setreload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="subtask" className="text-center text-2xl ">
          Subtarea:
        </label>
        <input
          className="items-center"
          ref={inputRef}
          type="text"
          value={subtaskText}
          name="subtask"
          id="subtask"
          onChange={(e) => {
            setSubtaskText(e.target.value);
          }}
          autoFocus={true}
        />

        <Button>Añadir a la lista</Button>
      </form>
      <Counter subtasks={subtasks} />
    </div>
  );
};

export default AddSubtaskForm;
